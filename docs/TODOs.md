# CURRENTLY

-   [ ] Extract Components
-   [ ] Computer Keyboard Input

# TODOs

-   [ ] For guitar author, use a Karplus Strong Pluck Synth.
-   [ ] See https://beatbucket.io/ to see how we can make our own synthesizers with the various options. Copy synths from AudioKit iPad Synth? (Run it on iOS Simulator).
-   [ ] Make Piano/Guitar Author V1 & V2 work again. If played by computer keyboard, we play the note and stop it a second later. If played by MIDI controller, we wait until we get a NOTE_OFF.
-   [ ] onChange for InputSaved. Then get the value and if it's hex, break it up, then update colors real time.
        LUMI?
-   [ ] See #MIDIAWEIIZAI. Use MIDI Keyboard to author!
    -   [ ] IMPORTANT: It should initialize the same things as if we pressed a computer key. It needs to go through the same setup path (and dismiss the preload popup)!
    -   [ ] See #RESETACQWIEIFK.f If we press down the B, C, C# at the same time, we reset the text field to empty!!!!
-   [ ] See #XKWIALDZA. Make the computer keyboard to piano key mapping customizable via an offset.
-   [ ] When I hit a key, figure out which note we want to play and add it to our text area.
    -   [ ] Should I have a NoteGroup class that handles Piano Notes and Guitar Notes? Or should they handle both? (Or at least support translating between the two....)
    -   [ ] Start with..... // XXXX32 => { 6:'X', 5:'X', 4:'X', 3:'X', 2:'3', 1:'2' } splitNoteGroup(noteGroup: string) {
-   [ ]
-   [x] LEARNED that React's setState functions are ASYNCHRONOUS. YOU CANNOT DEPEND ON THE VARIABLE TO CHANGE IMMEDIATELY.
-   [ ] Modify the `_document.tsx` to inject Material UI themes. I need to support the dark theme by default. See https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
-   [ ] Use the dark theme to make the guitar/v2 radio buttons have a white outline.
-   [ ] How to subscribe to changes in state in my App.ts? Do I need to forward changes from my component.tsx?
    -   [ ] Fix the checkbox shit.
-   [ ] Whenever tracks are loaded from localstorage or a MIDI file, they should be checked!
    -   [x] Maybe I should use the global redux store.... :-\
-   [ ] Keyboard Events (keyCode is deprecated). We should eventually transition to using either .key or .code, which do different things.
    -   [ ] `KeyboardEvent: key='${event.key}' | code='${event.code}'`;
-   [ ] Save all the file info, so that when we refresh the page, we can restore the song's file name, etc etc.... It should look exactly like after I drag a MIDI file into the bottom panel.
-   [ ] Have a button for me to add empty tracks manually!
-   [ ] FIX Mouse Handlers in PianoKeyboard.tsx. Right now clicking on left edge has a 17px offset or something. Whatever's going on, I end up playing the wrong note when I click the piano key.
    -   [ ] When my mouse leaves to the left side of the canvas, it plays middle C or something. Handle negative X values correctly! Clamp to 0! :-)
-   [ ] The first track should not be squished down. It should always be checked, if it's the only track.
-   [ ] Organize CSS for Tracks. Move them from index.tsx => Tracks.tsx.
-   [ ] CONTINUE: Fixing the Highlight Feature. We should not be able to highlight tracks that don't exist. Make sure the highlight is obvious.
-   [ ] Add a keyboard shortcut to ADD_NEW_TRACKS
    -   [ ] Then allow the user to append notes to different tracks.
    -   [ ] When we download the song, we will copy all notes as separate lines.
    -   [ ] When we play the song, we will play all tracks simultaneously, one notegroup per tick.
-   [ ] Rely on Singletons / Static Classes for storing the model. Then just dispatch EVENTS to say that the model has changed. EVENTS can just update the timestamp of the event or something, to trigger a re-render.
    -   [ ] Batch dispatches somehow.... I should only trigger the minimal amount of stuff that has changed, so we don't re-render too much!
-   [ ] Add a keyboard shortcut to ADD_MEASURE_SEPARATOR ||. This separator will be skipped during playback.
-   [ ] V2: Make interaction between JS/CSS and HTML/DOM more React-like rather than jQuery like!
-   [ ] Test out how <input> tags work in React. I swear there's a bug in React where onChange isn't fired when you select all and delete.
-   [ ] Piano.V1: The first note you hit will be Synth tones. It will auto switch to Sampler tones once everything is preloaded. SWEET!
-   [ ] Piano.V1: Piano.ts should preload the samples in a programmatic way with less repetition of the baseURL and audio file names.
-   [ ] Piano.V1: Right now, we need to hit space to preload the sounds. Can we preload by hitting any space?
-   [ ] Make Tone.js sound more like a piano w/ better pianoteq samples!
-   [ ] guitar/v1/App.ts has some BUGs.
    -   [ ] Press letter A right after the page is loaded. ERROR. We try to play a note, but Tone.js's mp3 buffers aren't yet loaded.
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
-   [ ] Learn about Debugging: https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_breakpoints

# DONE

-   [x] NOPE: LUMI Light up multiple keys (like I copied from ROLI Studio)
-   [x] NOPE: Pretend to be lumi. Respond to ROLI Studio with my played back device config? :-)
-   [x] Make progress on LUMI keys, and allow for customizing the device ID (at least support the one on github). Is there a way to query the device ID? How does ROLI Connect / Dashboard / Studio talk to
-   [x] Fix UpperCase/lowercase issues with file names! DOH!
-   [x] I cannot repeatedly play a note without it going silent. Tone.Sampler API changed after update.
-   [x] http://localhost:3001/midi instrument dropdown doesn't update properly when choosing Grand Pianos.
-   [x] Make Sampled Instruments work again! Why does the audio stop after a while??? Why can't we switch instruments back and forth?
-   [x] When we switch instruments, we should disconnect the old instrument. Is there a way to inspect our output to see how many instruments are currently connected?
-   [x] THE CODE IS REALLY UGLY :-) I'm still converting jQuery to React, so I should clean stuff up whenever possible.
-   [x] Fix bug where COPYRIGHT 2021 SquarePoet is NOT on the bottom right of the page when the page contents are too tall! It should be always at the bottom right once you scroll to the end of the contents.
