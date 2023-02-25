#!/bin/bash

# any future command that fails will exit the script
set -e

# stop, update, and restart service 
ls
cd huddleup
ls
cd webapp
ls
pm2 delete webapp
git pull
npm i
npm run build
pm2 start npm --name "webapp" -- start
