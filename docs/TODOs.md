<!--
- [ ] This is a todo item.
[//]: # (This is a comment. Ugly!)
-->

# NEXT

-   [ ] guitar/v1/App.ts has some BUGs.
    -   [ ] Press letter A right after the page is loaded. ERROR. We try to play a note, but Tone.js's mp3 buffers aren't yet loaded.
    -   [ ]

# TODOs

-   [ ] usePersistedState might cause a React error if something is wrong while loading the state as JSON. I had to call localStorage.clear()
-   [ ] npm i lodash for piano v1/v2
-   [ ] BUG: When I first load the page, the text area isn't populated correctly. ★★★★★
-   [ ] When I refresh or go to a URL directly, it gets a 404! Something about routing?
    -   [x] This does NOT happen on surge or GitHub pages! We need to configure something with the test server!
-   [ ] Add trailing slash on about/ page and other similar pages.
-   [ ] Add a simple component toolbar that persists between pages!

# DONE

-   [x] BUG: When I CMD+X on the Guitar Author V1, it doesn't cut to the clipboard! However, COPY works fine. :-P ???
-   [x] BUG: Sharps and Flats don't update if I delete!
-   [x] How do I import modules with absolute URLs? I don't like seeing all the dots and slashes.
-   [x] Test export!
