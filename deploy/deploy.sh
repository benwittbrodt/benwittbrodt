#!/usr/bin/env bash
# Runs on the LXC. Pulls the latest master, rebuilds, restarts the service.
# Invoked from your dev machine via `make deploy` (see Makefile) or by hand:
#   ssh bwsite@<lxc> /home/bwsite/app/deploy/deploy.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/home/bwsite/app}"
SERVICE="${SERVICE:-payload.service}"

cd "$APP_DIR"

echo "→ fetching latest master"
git fetch --prune origin
git reset --hard origin/master

echo "→ installing deps"
npm ci --no-audit --no-fund

echo "→ building"
npm run build

echo "→ restarting $SERVICE"
sudo systemctl restart "$SERVICE"

echo "→ status"
sudo systemctl --no-pager --lines=0 status "$SERVICE" || true
echo "✓ deploy finished"
