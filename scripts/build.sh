#!/usr/bin/env bash

if [ \( -e "build.sh" \) ]
then
     echo "Are you running this from the wrong directory?"
     echo "Please run this script from the project root."
     echo "cd .. to the directory containing package.json"
     exit 1
fi

npm run build
touch www/.gitkeep
