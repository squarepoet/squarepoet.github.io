#!/usr/bin/env bash
# We assume you have a folder that will be committed to GitLab pages.
WWW="www/"
GITLAB="../squarepoet.gitlab.io/public/"



# Copy the source files in www/ to the GitLab deployment folder.
rsync -avI --exclude '.git' --exclude '.gitignore' --exclude '.gitkeep'  $WWW  $GITLAB


# Next we need to commit and push
# Do this manually!
echo "Please cd to ../squarepoet.gitlab.io/"
echo "Commit and push to deploy to GitLab pages!"
echo ""
echo "https://squarepoet.gitlab.io/"
