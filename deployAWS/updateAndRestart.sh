#!/bin/bash

# any future command that fails will exit the script
set -e

# Update  path inorder to use npm and pm2 commands
export PATH="/home/ubuntu/.nvm/versions/node/v19.0.0/lib/node_modules/npm/bin:$PATH"
export PATH="/home/ubuntu/.nvm/versions/node/v19.0.0/bin:$PATH"
export PATH="/home/ubuntu/.nvm/versions/node/v19.0.0/lib/node_modules/pm2/bin:$PATH"

# stop, update, and restart service 
cd huddleup
cd webapp

#disable exit on failure
set +e

pm2 delete webapp

# any future command that fails will exit the script
set -e

git fetch
git checkout main
git pull

npm i
npm run build

pm2 start npm --name "webapp" -- start
