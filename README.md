# README

This repository hosts authoring tools for creating songs for Tiny Piano and Tiny Guitar.

Everything here is [MIT Licensed](LICENSE). Enjoy!

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

# Libaries

## Next JS & React

-   We render pages in React JS, and export static HTML files via Next.js

## Tone.js

-   We use Tone.js for all the sounds.

## Musical.js by PencilCode

-   Previously, we used the `musical` library to generate piano tones.
-   https://github.com/PencilCode/musical.js
-   It actually sounds better than Tone.js's default synths.
-   Can we learn something from it? It does some wavetable synthesis with parameters from Google Chrome Labs.

---

---

---

---

# OLD README

## Drag & Drop Library

-   dragdrop.min.js
-   https://github.com/feross/drag-drop

## JSmidgen

-   create MIDI files
-   jsmidgen.js
-   https://github.com/dingram/jsmidgen

## MIDIFile

-   read & write MIDI files
-   midifile.js
-   https://github.com/nfroidure/MIDIFile/
-   https://github.com/nfroidure/MIDIEvents/
-   https://github.com/nfroidure/UTF8.js/
