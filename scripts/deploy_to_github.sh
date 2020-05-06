#!/usr/bin/env bash
# First we need to synchronize the two www folders
rsync -a --exclude '.git' --exclude '.gitignore' www/ ../squarepoet.github.io.www/

# Next we need to commit and push
# Do this manually!
cd ../squarepoet.github.io.www/

echo "Please commit and push to deploy to GitHub!"