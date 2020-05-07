# Next JS Source Files
This branch contains the Next JS source files for the squarepoet.github.io website.

The local branch is: `next-js-src`.
This maps to the remote branch called => `next-js-src`.

Each of our remotes (`hub`, `lab`, `bucket`) have a `master` branch and a `next-js-src` branch.

When we build, we will output files to `www` which is just a symlink to `../squarepoet.github.io.www`.

Those files will be checked into the `master` branch.

When the `master` branch is pushed to GitHub, it will automatically publish to GitHub pages.



# GitHub Pages
View deployments here: https://github.com/squarepoet/squarepoet.github.io/deployments



# OLD README
This repo hosts authoring tools for creating songs for Tiny Piano and Tiny Guitar.
I also use it to explore new JavaScript SDKs. Everything in this repo is [MIT Licensed](LICENSE). Enjoy!

Below are the tool / libraries / SDKs I have explored while making my song authoring tools.

## VS Code

## TypeScript
  * Install TypeScript via npm
    `npm install -g typescript`
  * Open VSCode on the root directory, and press `SHIFT+CMD+B` to run `tsc`.
    This will watch for changes to `*.ts` files and write out `*.js` files.

## Next JS

## React

## Tone JS

## PencilCode
* musical library to generate tones
* musical.min.js & musical.js
* https://github.com/PencilCode/musical.js

## Drag & Drop Library
* dragdrop.min.js
* https://github.com/feross/drag-drop

## JSmidgen
* create MIDI files
* jsmidgen.js
* https://github.com/dingram/jsmidgen

## MIDIFile
* read & write MIDI files
* midifile.js
* https://github.com/nfroidure/MIDIFile/
* https://github.com/nfroidure/MIDIEvents/
* https://github.com/nfroidure/UTF8.js/
