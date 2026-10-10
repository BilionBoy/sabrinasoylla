#!/bin/zsh
cd "$(dirname "$0")/dist"
open http://localhost:8081
python3 -m http.server 8081 --bind 127.0.0.1
