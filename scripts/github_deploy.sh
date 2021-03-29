#!/usr/bin/env bash
# First we need to synchronize the two www folders
rsync -avv --exclude '.git' --exclude '.gitignore' --exclude '.gitkeep' --exclude '.nojekyll' www/ ../squarepoet.github.io.www/

# Next we need to commit and push
# Do this manually!
echo "Please cd to ../squarepoet.github.io.www/"
echo "Commit and push to deploy to GitHub / GitLab!"