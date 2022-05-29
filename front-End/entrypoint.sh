#!/bin/sh
# setting port from environment
MYPORT="${PORT:=8000}"
echo $MYPORT
npm config set frontApp:port $MYPORT
npm config get frontApp:port
npm start