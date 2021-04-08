# README

This repository contains some experiments with computer music. It includes authoring tools for creating songs for my apps: Tiny Piano & Tiny Guitar.

# Next JS Source Files

This branch contains the Next JS source files for the squarepoet.github.io website.

The local branch is: `next-js-src`.
This maps to the remote branch called => `next-js-src`.

Each of our remotes (`hub`, `lab`, `bucket`) have a `master` branch and a `next-js-src` branch.

When we build, we will output files to `www` which is just a symlink to `../squarepoet.github.io.www`.

Those files will be checked into the `master` branch.

When the `master` branch is pushed to GitHub, it will automatically publish to GitHub pages.

## File Naming

I am old Java nerd, so I prefer PascalCase for file names of React components and JS modules. However, files under the `pages/` directory are all lowercase, with hyphens for readability. This means our public URLs are all lowercase.

# GitHub Pages

View deployments here: https://github.com/squarepoet/squarepoet.github.io/deployments

# Libaries

## Next & React

-   We render pages in React JS, and export static HTML files via Next.js

## Tone.js & Musical.js

-   We use Tone.js or Musical.js for all the sounds.
-   Musical actually sounds better than Tone.js's default synths.
    -   https://github.com/PencilCode/musical.js
    -   Can we learn something from it? It does some wavetable synthesis with parameters from Google Chrome Labs.

## JSmidgen

-   create MIDI files
-   https://github.com/dingram/jsmidgen

## MIDIFile

-   read & write MIDI files
-   midifile.js
-   https://github.com/nfroidure/MIDIFile/
-   https://github.com/nfroidure/MIDIEvents/
-   https://github.com/nfroidure/UTF8.js/

## File Drag & Drop

-   https://github.com/sarink/react-file-drop

# License

Everything under https://github.com/squarepoet/squarepoet.github.io is [MIT Licensed](LICENSE). Enjoy!
