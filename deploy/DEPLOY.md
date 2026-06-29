# Deployment

The site runs as a single Node process on a Proxmox LXC, fronted by Nginx
Proxy Manager and Cloudflare Tunnel. SQLite lives on disk; uploads live on
disk. Backups are `rsync`. Deploys are `make deploy` from your laptop.

## One-time LXC bootstrap

Provision a Debian 12 LXC (~1 GB RAM, ~5 GB disk is plenty).

### 1. System packages

```bash
apt update
apt install -y curl ca-certificates gnupg git build-essential sudo
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
```

### 2. App user + persistent data dir

The data dir lives outside the repo so it survives a redeploy / reclone.
Put it on a dataset you snapshot (ZFS, btrfs, or just rsync nightly).

```bash
useradd -m -s /bin/bash bwsite
mkdir -p /var/lib/payload/media
chown -R bwsite:bwsite /var/lib/payload
```

### 3. Clone + first build (as bwsite)

```bash
sudo -iu bwsite

cd ~
git clone https://github.com/benwittbrodt/benwittbrodt.git app
cd app

# Persistent files live outside the repo; symlink them in.
ln -s /var/lib/payload/payload.db payload.db
rm -rf media && ln -s /var/lib/payload/media media

# Configure
cp .env.example .env
# Edit .env:
#   PAYLOAD_SECRET=<openssl rand -hex 32>
#   DATABASE_URL=file:./payload.db
#   NEXT_PUBLIC_SITE_URL=https://benwittbrodt.com
nano .env

npm ci
npm run build
exit  # back to root
```

### 4. systemd unit

```bash
install -m 644 /home/bwsite/app/deploy/payload.service /etc/systemd/system/payload.service
systemctl daemon-reload
systemctl enable --now payload.service
systemctl status payload.service
```

It binds to `127.0.0.1:3000`. The Next process serves both the public
site and `/admin`.

### 5. sudoers for deploy.sh

The deploy script restarts the service. Let bwsite do that without a
password — and nothing else:

```bash
cat <<'EOF' >/etc/sudoers.d/bwsite-payload
bwsite ALL=(root) NOPASSWD: /bin/systemctl restart payload.service, /bin/systemctl status payload.service, /bin/journalctl -u payload.service *
EOF
chmod 440 /etc/sudoers.d/bwsite-payload
visudo -c  # validate
```

### 6. SSH key from your laptop

```bash
ssh-copy-id bwsite@<lxc-ip>
# from your laptop:
ssh bwsite@<lxc-ip> echo ok
```

If the LXC isn't routable by name from your laptop, add an alias in
`~/.ssh/config`:

```
Host benwittbrodt-lxc
  HostName 10.0.0.42        # <- whatever the LXC IP is
  User bwsite
```

The repo's Makefile defaults to `bwsite@benwittbrodt-lxc`. Override with
`make deploy LXC=bwsite@<other>` if needed.

### 7. NPM proxy host

In Nginx Proxy Manager:

- **Domain**: `benwittbrodt.com` (+ `www.benwittbrodt.com`)
- **Forward**: `http://<lxc-ip>:3000`
- **Block common exploits**: on
- **Websockets support**: on (Payload admin uses them)
- **SSL**: handled by Cloudflare Tunnel at the edge, NPM can issue Let's
  Encrypt for the internal hop too if you want

Cloudflare Tunnel config: route `benwittbrodt.com` → `http://npm:80` (or
whatever your existing pattern is).

### 8. First admin user

Hit `https://benwittbrodt.com/admin`. Payload's onboarding flow asks you
to create the first user. Done.

## Day-to-day

From the repo on your laptop:

```bash
git push origin master   # publish your changes
make deploy              # rebuild + restart on the LXC
```

Other helpers:

```bash
make logs       # tail journalctl -u payload.service -f
make restart    # systemctl restart payload.service
make ssh        # interactive shell on the LXC
make backup     # rsync /var/lib/payload/ -> ~/Backups/benwittbrodt/
```

## Backups

A bare-minimum nightly cron on the LXC:

```bash
# /etc/cron.daily/payload-backup
#!/bin/sh
set -e
ts=$(date +%Y%m%d)
DEST=/var/backups/payload
mkdir -p "$DEST"
# SQLite-safe online backup (does not block writers)
sqlite3 /var/lib/payload/payload.db ".backup '$DEST/payload-$ts.db'"
tar -C /var/lib/payload -czf "$DEST/media-$ts.tar.gz" media
# keep last 14
ls -1t "$DEST"/payload-*.db | tail -n +15 | xargs -r rm
ls -1t "$DEST"/media-*.tar.gz | tail -n +15 | xargs -r rm
```

`chmod +x` it. Restic / borg pointed at `/var/backups/payload` if you
want offsite.

## Upgrading Payload / Next.js

Bump versions in `package.json` locally, `npm install`, run `npm run dev`
to make sure nothing exploded, run `npm run generate:importmap` and
`npm run generate:types` if collections changed, commit, push, deploy.

## Rollback

```bash
ssh bwsite@benwittbrodt-lxc
cd ~/app
git log --oneline -10        # find the prior good commit
git reset --hard <sha>
npm ci && npm run build
sudo systemctl restart payload.service
```

The SQLite DB is unchanged by a code rollback — schema changes that
require down-migrations are the only thing that can bite you, and
Payload doesn't auto-drop columns (it adds, marks fields as `_deprecated`).

## When you outgrow `make deploy`

If pushing daily and SSH-ing feels old, the lightest CI upgrade is a
**self-hosted GitHub Actions runner** on the same LXC:

1. Install runner under `bwsite` from the repo's Settings → Actions →
   Runners → New self-hosted runner page.
2. Add `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy
   on:
     push: { branches: [master] }
   jobs:
     deploy:
       runs-on: self-hosted
       steps:
         - run: /home/bwsite/app/deploy/deploy.sh
   ```

Now `git push` deploys. No inbound SSH needed — the runner polls
GitHub.
