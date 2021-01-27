<!--
- [ ] This is a todo item.
[//]: # (This is a comment. Ugly!)
-->

# NEXT

# Piano TODOs

-   [ ] After we load bingo.mid, nothing changes until we load bingo.mid a second time. Need to trigger all the UI changes!
    -   [ ] AH, THE FILE LOADING WAS ASYNCHRONOUS.
        -   [ ] LEARN ABOUT JS async functions
-   [ ] Replace Redux w/ the Context API.
    -   [ ] Rely on Singletons / Static Classes for storing data. Then just dispatch EVENTS to say that the model has changed. EVENTS can just update the timestamp of the event or something.
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

-   [ ] Learn more about debugging.
    -   [ ] chrome://inspect/

# DONE

-   [x] Open the File somehow, by passing the File object to the right place in whatever way possible.
-   [x] V2: Make the track and track-info layout look correct again!
-   [x] Rename Piano.ts to PlayableInstrument.ts or Instrument.ts something.
-   [x] V2: Share some components with V2, for example: sharps/flats.
    -   [x] V1 vs V2 lay out the sharps/flats div differently. Let them customize the css? float: right|left;
-   [x] Sharps / Flats Don't Update in V1
-   [x] Piano V1 is DONE for now
-   [x] Add a simple component toolbar that persists between pages!
-   [x] Globally check if web audio is initialized. If not, show a overlay that says press any key to dismiss and start web audio session.
-   [x] Revert to using musical.js. Rewrite it in TS!
    -   [x] Include RONYEH's patch!
-   [x] Make Tone.js sound more like a piano!
    -   [x] See: https://keithwhor.com/music/
        -   [x] Sounds like an electric piano, but has some clipping noise.
    -   [x] https://github.com/nbrosowsky/tonejs-instruments
        -   [x] I took his samples, but I should really make my own from pianoteq!
-   [x] BUG in Piano V1: When I CMD+X to cut the text from the main text area, it disables the text area. WTF!
-   [x] BUG: When I CMD+X on the Guitar Author V1, it doesn't cut to the clipboard! However, COPY works fine. :-P ???
-   [x] BUG: Sharps and Flats don't update if I delete!
-   [x] How do I import modules with absolute URLs? I don't like seeing all the dots and slashes.
-   [x] Test export!
