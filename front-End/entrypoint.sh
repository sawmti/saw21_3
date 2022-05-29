#!/bin/sh
# setting port from environment
MYPORT="${PORT:=8000}"
echo $MYPORT
npm run start -- --port=$MYPORT