#!/usr/bin/env bash
# We assume you have a folder that will be committed to GitHub pages.
WWW="www/"
GITHUB="../squarepoet.github.io.www/"
NOJEKYLL=".nojekyll"
GITHUB_NOJEKYLL=$GITHUB$NOJEKYLL

# Copy the source files in www/ to the GitHub deployment folder.
rsync -avI --exclude '.git' --exclude '.gitignore' --exclude '.gitkeep'  $WWW  $GITHUB
touch $GITHUB_NOJEKYLL

# Next we need to commit and push
# Do this manually!
echo "Please cd to" $GITHUB
echo "Commit and push to deploy to GitHub pages!"
echo ""
echo "https://squarepoet.github.io/"
