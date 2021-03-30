#!/usr/bin/env bash
# First we need to synchronize the two www folders
FROM_WWW="www/"
GITHUB="../squarepoet.github.io.www/"
NOJEKYLL=".nojekyll"
GITHUB_NOJEKYLL=$GITHUB$NOJEKYLL

# Copy the source files in www/ to the GitHub deployment folder.
rsync -avv --exclude '.git' --exclude '.gitignore' --exclude '.gitkeep' --exclude  $FROM_WWW  $GITHUB
touch $GITHUB_NOJEKYLL

# Next we need to commit and push
# Do this manually!
echo "Please cd to ../squarepoet.github.io.www/"
echo "Commit and push to deploy to GitHub pages!"
echo "https://squarepoet.github.io/"
