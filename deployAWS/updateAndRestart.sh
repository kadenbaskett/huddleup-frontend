#!/bin/bash

# any future command that fails will exit the script
set -e

# Update  path inorder to use npm and pm2 commands
export PATH="/home/ubuntu/.nvm/versions/node/v19.0.0/lib/node_modules/npm/bin:$PATH"

# stop, update, and restart service 
ls
cd huddleup
ls
cd webapp
ls
# pm2 delete webapp
git pull
npm i
npm run build
pm2 start npm --name "webapp" -- start
