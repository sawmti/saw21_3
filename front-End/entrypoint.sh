#!/bin/sh
# setting port from environment
MYPORT="${PORT:=8000}"
npm config set frontApp:port $MYPORT
npm start