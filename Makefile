# Personal deploy helpers. Customize via env vars or .makerc.
#
#   make deploy             # ssh to the LXC and run deploy.sh
#   make logs               # tail the service journal
#   make restart            # restart the service
#   make backup             # rsync payload.db + media to LOCAL_BACKUP_DIR
#
# Override the SSH target if needed:
#   make deploy LXC=bwsite@payload.local

LXC ?= bwsite@benwittbrodt-lxc
LOCAL_BACKUP_DIR ?= $(HOME)/Backups/benwittbrodt

.PHONY: deploy logs restart backup ssh

deploy:
	ssh $(LXC) /home/bwsite/app/deploy/deploy.sh

logs:
	ssh $(LXC) sudo journalctl -u payload.service -f -n 200

restart:
	ssh $(LXC) sudo systemctl restart payload.service

backup:
	mkdir -p $(LOCAL_BACKUP_DIR)
	rsync -av --delete $(LXC):/var/lib/payload/ $(LOCAL_BACKUP_DIR)/

ssh:
	ssh $(LXC)
