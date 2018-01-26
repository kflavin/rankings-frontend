#!/bin/ash

echo "Starting the server"
echo $RANKINGS_HOST
echo $RANKINGS_PORT
export RANKINGS_HOST
export RANKINGS_PORT
npm run start
