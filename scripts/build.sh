#!/usr/bin/env bash
npm run build
touch www/.gitkeep
cp docs/MasterBranchREADME.md www/README.md
