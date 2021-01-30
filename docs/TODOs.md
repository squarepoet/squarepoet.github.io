<!--
- [ ] This is a todo item.
[//]: # (This is a comment. Ugly!)
-->

# NEXT

-   [ ] Rely on Singletons / Static Classes for storing the model. Then just dispatch EVENTS to say that the model has changed. EVENTS can just update the timestamp of the event or something, to trigger a re-render.
    -   [ ] Batch dispatches somehow.... I should only trigger the minimal amount of stuff that has changed, so we don't re-render too much!
-   [ ] Fix the Highlight Feature
-   [ ] Add a keyboard shortcut to ADD_NEW_TRACKS
    -   [ ] Then allow the user to append notes to different tracks.
    -   [ ] When we download the song, we will copy all notes as separate lines.
    -   [ ] When we play the song, we will play all tracks simultaneously, one notegroup per tick.
-   [ ] Add a keyboard shortcut to ADD_MEASURE_SEPARATOR ||. This separator will be skipped during playback.

# Piano TODOs

-   [ ] THE CODE IS REALLY UGLY :-) I'm still converting jQuery to React, so I should clean stuff up whenever possible.
    -   [ ] V2: Make interaction between JS/CSS and HTML/DOM more React-like rather than jQuery like!
-   [ ] Test out how <input> tags work in React. I swear there's a bug in React where onChange isn't fired when you select all and delete.
-   [ ] Piano.V1: The first note you hit will be Synth tones. It will auto switch to Sampler tones once everything is preloaded. SWEET!
-   [ ] Piano.V1: Piano.ts should preload the samples in a programmatic way with less repetition of the baseURL and audio file names.
-   [ ] Piano.V1: Right now, we need to hit space to preload the sounds. Can we preload by hitting any space?
-   [ ] Make Tone.js sound more like a piano w/ better pianoteq samples!

# Other TODOs

-   [ ] guitar/v1/App.ts has some BUGs.

    -   [ ] Press letter A right after the page is loaded. ERROR. We try to play a note, but Tone.js's mp3 buffers aren't yet loaded.
    -   [ ]

-   [ ] Need to support Workers in Next.js
        https://github.com/GoogleChromeLabs/worker-plugin
        https://github.com/koheitakumi/nextjs-typescript-comlink
        https://github.com/vercel/next.js/tree/canary/examples/with-web-worker
-   [ ] usePersistedState might cause a React error if something is wrong while loading the state as JSON. I had to call localStorage.clear()
-   [ ] npm i lodash for piano v1/v2
-   [ ] BUG: When I first load the page, the text area isn't populated correctly. ★★★★★
-   [ ] When I refresh or go to a URL directly, it gets a 404! Something about routing?
    -   [x] This does NOT happen on surge or GitHub pages! We need to configure something with the test server!
-   [ ] Add trailing slash on about/ page and other similar pages.

# Debugging with Chrome and VSCode

-   [x] Learn more about debugging.
    -   [x] chrome://inspect/
    -   [x] In VS Code, hit CMD+P and enter >Debug:Start Debugging
    -   [x] Then add debugger; statements
    -   [ ] See https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_breakpoints

# DONE
