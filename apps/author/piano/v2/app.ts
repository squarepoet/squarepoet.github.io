import Highlight from "apps/author/piano/v2/Highlight";
import { Note, NoteGroup, Track } from "apps/author/piano/v2/Music";
import Constants from "apps/shared/Constants";
import Utils from "apps/shared/dom/Utils";
import MIDIFileIO from "apps/shared/midi/MIDIFileIO";
import MIDIUtils from "apps/shared/midi/MIDIUtils";
import Actions from "apps/shared/redux/Actions";
import Instrument from "apps/shared/sound/Instrument";
import throttle from "lodash.throttle";

const MIDIEvents = require("midievents");

const TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES = 0; // Adjust this for parsing MIDI recordings of piano performances by humans (i.e., imprecise timing).

// Dispatch events and send data to the global store.
let dispatch: Function = null;

// #TODO: Set up a dummy jQuery $ function while we are porting to React.
const $ = (arg) => {
    console.log(`jQuery called with arg [${arg}]`);
    const retVal = {
        addClass: (addClassArg) => {
            console.log(`jQuery.addClass called with [${addClassArg}]`);
        },
        removeClass: (removeClassArg) => {
            console.log(`jQuery.removeClass called with [${removeClassArg}]`);
        },
        prop: (propArg1, propArg2) => {
            console.log(`jQuery.prop called with [${propArg1}] [${propArg2}]`);
        },
        bind: (bindArg1, bindArg2) => {
            console.log(`jQuery.bind called with [${bindArg1}] [${bindArg2}]`);
            return retVal; // support chaining
        },
        unbind: (unbindArg) => {
            console.log(`jQuery.unbind called with [${unbindArg}]`);
            return retVal; // support chaining
        },
        click: (clickArg) => {
            console.log(`jQuery.click called with [${clickArg}]`);
        },
        mousedown: (mousedownArg) => {
            console.log(`jQuery.mousedown called with [${mousedownArg}]`);
        },
        mouseover: (mouseoverArg) => {
            console.log(`jQuery.mouseover called with [${mouseoverArg}]`);
        },
        mousemove: (mousemoveArg) => {
            console.log(`jQuery.mousemove called with [${mousemoveArg}]`);
        },
    };
    return retVal;
};

/////////////////////////////////////////////////////////////////////////////////
// declare types that are defined in 3rd party libraries
// TODO
/////////////////////////////////////////////////////////////////////////////////

const TIME_BETWEEN_NOTEGROUPS = 250;

let octaveOffset = 0;

// piano key numbers % 12
let blackKeys = [2, -1, 5, 7, -1, 10, 0]; // -1 is for the spaces where there are no black keys
let whiteKeys = [1, 3, 4, 6, 8, 9, 11];
let noteLabels = ["a", "b", "c", "d", "e", "f", "g"];

let sharpOrFlatModifier = 0;

let piano = null;

namespace Keyboard {
    // which character to type to get the corresponding white key
    export const labels = [
        "z",
        "x", // G A B
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".", // C D E F G A B
        "/",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h", // C D E F G A B
        "j",
        "k",
        "l",
        ";",
        "q",
        "w",
        "e", // C D E F G A B
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p", // C D E F G A B
        "[",
        "]",
        "\\",
        "1",
        "2",
        "3",
        "4", // C D E F G A B
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-", // C D E F G A B
        "=", // C
    ];

    export const keyCodeToPianoKeyNumber = {
        90: 13, // z => A
        88: 15, // x => B
        //
        67: 16, // c => C2
        86: 18, // v => D
        66: 20, // b => E
        78: 21, // n => F
        77: 23, // m => G
        188: 25, // , => A
        190: 27, // . => B
        //
        191: 28, // / => C3
        65: 30, // a => D
        83: 32, // s => E
        68: 33, // d => F
        70: 35, // f => G
        71: 37, // g => A
        72: 39, // h => B
        //
        74: 40, // j => C4 (Middle C)
        75: 42, // k => D
        76: 44, // l => E
        186: 45, // ; => F in Chrome
        59: 45, // ; => F in Firefox
        222: 47, // ' => G
        81: 47, // q => G
        87: 49, // w => A
        69: 51, // e => B
        //
        82: 52, // r => C5
        84: 54, // t => D
        89: 56, // y => E
        85: 57, // u => F
        73: 59, // i => G
        79: 61, // o => A
        80: 63, // p => B
        //
        219: 64, // [ => C6
        221: 66, // ] => D
        220: 68, // \ => E

        49: 69, // 1 => F
        50: 71, // 2 => G
        51: 73, // 3 => A
        52: 75, // 4 => B
        //
        53: 76, // 5 => C7
        54: 78, // 6 => D
        55: 80, // 7 => E
        56: 81, // 8 => F
        57: 83, // 9 => G
        48: 85, // 0 => A
        189: 87, // - => B
        //
        187: 88, // = => C8
    };
}

namespace MIDIPianoInput {
    let numNotesPressed: number = 0;

    export function setup() {
        if (navigator["requestMIDIAccess"]) {
            navigator["requestMIDIAccess"]({ sysex: false }).then(onMIDISuccess, onMIDIFailure);
        } else {
            alert("No MIDI support in your browser.");
        }
    }

    function onMIDISuccess(midiAccess) {
        let midi = midiAccess;
        var inputs = midi.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = onMIDIMessage;
        }
    }

    function onMIDIFailure(error) {
        console.log("No access to MIDI devices or your browser doesn't support WebMIDI API." + error);
    }

    function onMIDIMessage(message) {
        var data = message.data; // this gives us our [command/channel, note, velocity] data.

        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf; // Rightmost 4 bits.
        var type = data[0] & 0xf0; // 4 bits in the second right-most position.
        var note = data[1];
        var velocity = data[2];
        var pianoKey = note - 20;

        switch (type) {
            case 144: // note on
                console.log("piano key down: " + pianoKey + " velocity: " + velocity);
                App.playOneNote(pianoKey, false); // the second parameter (set to false) will bypass any sharp/flat modifiers.
                numNotesPressed++;
                if (numNotesPressed > 1) {
                    Song.mergeLastTwoGroups();
                }
                break;
            case 128: // note off
                // console.log("piano key up: " + pianoKey);
                numNotesPressed--;
                break;
            case 224: // pitch wheel
                console.log("pitch wheel"); // data[1] and data[2] indicate the amount of pitch bend.
                break;
            default:
                // ignore for now
                // console.log('MIDI data', data);
                // console.log(`cmd: ${cmd}  channel: ${channel}  type: ${type}  note: ${note}  velocity: ${velocity}`);
                break;
        }
    }
}

//////////////////////////////////////////////////////////////////////

// resets the key offset
function resetOffset() {
    console.log("Reset Offsets");
    octaveOffset = 0;
    UI.drawPiano();
}

function resetEverything() {
    console.log("Reset Everything!");
    octaveOffset = 0;
    UI.Tracks.setup(1);
    saveAndShowData();
    Playback.stop();

    // TODO: Use setState somehow....
    // setHTML("file-info", "&nbsp;");
    // setHTML("song-info", "&nbsp;");
}

function saveAndShowData() {
    LocalStorage.saveCheckBoxes();
    LocalStorage.saveTracks();
    UI.showNoteGroupsForTracks();
    UI.drawPiano();
}

////////////////////////////////////////////////////////////

namespace LocalStorage {
    export function load() {
        loadTracks();
        loadVersionToggle();
    }

    function loadVersionToggle() {
        console.log("LOAD VERSION TOGGLE");
        if (!localStorage.getItem("song_version")) {
            localStorage.setItem("song_version", "1");
        }
        let songVersion = parseInt(localStorage.getItem("song_version"));
        if (songVersion < Constants.MIN_SONG_VERSION || songVersion > Constants.MAX_SONG_VERSION) {
            songVersion = 1;
        }
        const payload = {};
        payload[Constants.StoreKeys.SONG_VERSION] = songVersion;
        dispatch({ type: Actions.Toggle.onSongVersionFormatChanged, payload: payload });
    }

    function loadTracks() {
        try {
            const savedTracks = JSON.parse(localStorage.getItem("tracks")); // can throw a SyntaxError
            const numTracks = savedTracks.length;

            UI.Tracks.setup(numTracks);
            for (let t = 0; t < numTracks; t++) {
                let savedTrack = savedTracks[t];
                for (let noteGroupString of savedTrack) {
                    let noteGroup = new NoteGroup(noteGroupString);
                    Song.addNoteGroupToTrack(noteGroup, t);
                }
            }
        } catch (e) {
            UI.Tracks.setup(1);
        }
    }

    function loadCheckboxes() {
        try {
            const savedCheckboxState = JSON.parse(localStorage.getItem("checkboxes")); // can throw a SyntaxError
            if (Array.isArray(savedCheckboxState) && savedCheckboxState.length === Song.getNumTracks()) {
                UI.Tracks.setCheckedStateForAllTracks(savedCheckboxState);
            } else {
                throw "OOPS";
            }
        } catch (e) {
            UI.Tracks.checkAllNonEmptyTracks();
            LocalStorage.saveCheckBoxes();
        }
    }

    export function saveCheckBoxes() {
        localStorage.setItem("checkboxes", JSON.stringify(UI.Tracks.getCheckedStateForAllTracks()));
    }

    export function saveTracks() {
        let tracksJSON = Song.getTracksAsJSON();
        localStorage.setItem("tracks", tracksJSON);
    }

    export function saveVersionToggle(songVersion: number) {
        localStorage.setItem("song_version", songVersion + "");
    }
}

/////////////////////////////////////////////////////////////////////////////////

class FakeWorkerClock {
    private isRunning = false;
    private interval = null;
    private delay = 10; // ms between ticks

    public onmessage: Function;
    public postMessage(msg: string) {
        let self = this;
        console.log(self);
        switch (msg) {
            case "start":
                console.log("Piano Clock Worker Started");
                if (!self.isRunning) {
                    self.isRunning = true;
                    self.interval = setInterval(() => {
                        if (self.onmessage) {
                            self.onmessage("tick");
                        }
                    }, self.delay);
                }
                break;
            case "stop":
            default:
                console.log("Piano Clock Worker Stopped");
                clearInterval(self.interval);
                self.isRunning = false;
                break;
        }
    }
}

///////////////////////////////////////////////////////////////////////////

namespace Playback {
    // All times are in milliseconds.
    let currSongTime = 0; // What time is our playhead pointing to?
    let baseSongTime = 0; // What time did our playhead point to when we started or resumed the song?
    let clockStartTime = 0;

    let clock = new FakeWorkerClock();
    // let clock = new Worker("./clock.worker.js", { type: "module" });
    let clockIsTicking = false;

    clock.onmessage = function (e) {
        playNextEvents(performance.now());
    };

    let currNoteGroupNumber: number = 0;

    let isPaused = false;

    let nextEventPlayTime = 0;

    export function isPlaying() {
        return clockIsTicking;
    }

    // starts or resumes playback
    export function play() {
        console.log("PLAY");
        if (isPaused) {
            baseSongTime = currSongTime;
        } else {
            if (isPlaying()) {
                stop();
            }

            // Start the MIDI playback.
            const noteGroupsToPlay = Song.getNoteGroupsFromTracks();

            if (noteGroupsToPlay.length === 0) {
                Playback.stop();
                return; // DONE!
            }

            currNoteGroupNumber = 0;
            currSongTime = 0;
            baseSongTime = 0;
            determinePlayTimeForNextEvent();
        }
        isPaused = false;
        clockStartTime = performance.now();
        clock.postMessage("start");
        clockIsTicking = true;
    }

    export function pause() {
        stopTheClock();
        isPaused = true; // Next time, continue from where we left off.
    }

    export function togglePlayPause() {
        if (isPlaying()) {
            pause();
        } else {
            play();
        }
    }

    export function stop() {
        stopTheClock();
        currNoteGroupNumber = 0;
    }

    function stopTheClock() {
        if (isPlaying()) {
            clock.postMessage("stop");
            clockIsTicking = false;
        }
    }

    // Will be called every ~16.67ms if your display runs at 60 FPS.
    function playNextEvents(currTime) {
        const noteGroupsToPlay = Song.getNoteGroupsFromTracks();
        // Have we reached the end of the song?
        if (currNoteGroupNumber >= noteGroupsToPlay.length) {
            Playback.stop();
            return; // DONE!
        }

        currSongTime = currTime - clockStartTime + baseSongTime;

        while (currSongTime >= nextEventPlayTime) {
            // Inspect the next event
            let noteGroup: NoteGroup = noteGroupsToPlay[currNoteGroupNumber];
            Highlight.setTrackAndNoteGroup(noteGroup.trackNumber, noteGroup.noteNumber);
            playCurrentNoteGroup();
            currNoteGroupNumber++; // advance

            // Have we reached the end of the song?
            if (currNoteGroupNumber >= noteGroupsToPlay.length) {
                Playback.stop();
                return; // DONE!
            } else {
                determinePlayTimeForNextEvent();
            }
        }
    }

    function determinePlayTimeForNextEvent() {
        const noteGroupsToPlay = Song.getNoteGroupsFromTracks();
        nextEventPlayTime = noteGroupsToPlay[currNoteGroupNumber].playTimeMillis;
        if (nextEventPlayTime === -1) {
            nextEventPlayTime = currSongTime + TIME_BETWEEN_NOTEGROUPS; // If the playTime isn't specified, we play the next note every 200ms!
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    // Manual Playback of the song or individual tracks.

    function validateCurrNoteGroupNumber() {
        const noteGroupsToPlay = Song.getNoteGroupsFromTracks();
        if (currNoteGroupNumber >= noteGroupsToPlay.length) {
            currNoteGroupNumber = noteGroupsToPlay.length - 1;
        } else if (currNoteGroupNumber < 0) {
            currNoteGroupNumber = 0;
        }
    }

    export const playNoteAndGoBackwardInTheSong = throttle(function () {
        playNoteAndAdvanceInDirection(-1);
    }, 150 /* ms */);

    export const playNoteAndGoForwardInTheSong = throttle(function () {
        playNoteAndAdvanceInDirection(+1);
    }, 150 /* ms */);

    function playNoteAndAdvanceInDirection(direction: number) {
        const noteGroupsToPlay = Song.getNoteGroupsFromTracks();
        if (noteGroupsToPlay.length === 0) {
            return;
        }
        validateCurrNoteGroupNumber();

        let noteGroup: NoteGroup = noteGroupsToPlay[currNoteGroupNumber];
        Highlight.setTrackAndNoteGroup(noteGroup.trackNumber, noteGroup.noteNumber);
        playCurrentNoteGroup();
        currNoteGroupNumber += direction;
        validateCurrNoteGroupNumber();
    }

    function playCurrentNoteGroup() {
        let t = Highlight.getCurrentTrackNumber();
        let n = Highlight.getCurrentNoteGroupNumber();
        let noteGroup = Song.getNoteGroupFromTrack(n, t);
        if (!noteGroup) {
            return;
        }
        for (let note of noteGroup.notes) {
            App.playPianoNote(MIDIUtils.m2p(note.midiNote), note.velocity);
        }
        let $noteGroup = $(`#t${t}_n${n}`);
        $noteGroup.addClass("played-note");
        setTimeout(function () {
            $noteGroup.removeClass("played-note");
        }, 400);
    }

    export const playAndGoBackwardOnCurrentTrack = throttle(function () {
        playCurrentNoteGroup();
        Highlight.prevNoteGroup();
    }, 150 /* ms */);

    export const playAndGoForwardOnCurrentTrack = throttle(function () {
        playCurrentNoteGroup();
        Highlight.nextNoteGroup();
    }, 150 /* ms */);
}

namespace UI {
    export function setupCopyHandler() {
        document.querySelector("html").addEventListener("copy", function (e: ClipboardEvent) {
            e.preventDefault();
            console.log("COPY");
            if (e.clipboardData) {
                const text = UI.Tracks.getTextFileFromTracks();
                e.clipboardData.setData("text/plain", text);
            }
        });
        document.querySelector("html").addEventListener("cut", function (e: ClipboardEvent) {
            e.preventDefault();
            console.log("CUT");
            if (e.clipboardData) {
                const text = UI.Tracks.getTextFileFromTracks();
                e.clipboardData.setData("text/plain", text);
            }
            resetEverything(); // Set the text fields to empty strings.
        });
    }

    export function showNoteGroupsForTracks() {
        UI.Tracks.checkAllNonEmptyTracks();
        Highlight.update();
        const payload = {};
        payload[Constants.StoreKeys.UPDATED_TRACKS_LIST] = Song.getRecentlyUpdatedTrackNumbersAsArray();
        dispatch({ type: Actions.Song.onTracksUpdated, payload: payload });
        Song.resetRecentlyUpdatedTrackNumbers();
    }

    export function scrollNoteGroupIntoView(trackNumber: number, noteGroupNumber: number) {
        const noteGroupID = Song.getNoteGroupID(trackNumber, noteGroupNumber);
        // Scroll the divs all the way to the right to make sure the most recent NoteGroups are visible.
        const element = <HTMLElement>document.querySelector(`#${noteGroupID}`);
        if (element) {
            element.scrollIntoView();
        }
    }

    ////////////////////////////////////////////////////////////

    // MOUSE & KEYBOARD

    export function onKeyDownHandler(e) {
        if (!piano) {
            console.log("onKeyDownHandler: Piano has not been initialized.");
            return;
        } else if (App.isFocusedOnSharpsOrFlatsInput()) {
            // If we are typing in the sharps/flats input, we should ignore the rest of the key handler.
            return;
        }

        const keyCode = e.keyCode;
        const metaKeyIsDown = e.metaKey; // e.metaKey => CMD (91 is LEFT CMD & 93 is RIGHT CMD)
        const ctrlKeyIsDown = e.ctrlKey;
        const shiftKeyIsDown = e.shiftKey;

        if (metaKeyIsDown) {
            if (keyCode == 37 || keyCode == 39) {
                // DO NOTHING. Fall through so that we can do CMD + LEFT ARROW and CMD + RIGHT ARROW.
            } else {
                // Ignore when we have the CMD pressed down, so that we can use the browser's hotkeys.
                return;
            }
        }

        // CTRL => FLAT and SHIFT => SHARP
        sharpOrFlatModifier = 0;
        if (ctrlKeyIsDown) {
            sharpOrFlatModifier = -1;
        }
        if (shiftKeyIsDown) {
            sharpOrFlatModifier = +1;
        }

        e.preventDefault();
        switch (keyCode) {
            case 13: // ENTER
                Playback.togglePlayPause();
                break;
            case 33: // PAGE UP | fn + UP_ARROW
                console.log("fn + UP");
                // Up an octave.
                octaveOffset++;
                if (octaveOffset > 2) {
                    octaveOffset = 2;
                }
                UI.drawPiano();
                break;
            case 34: // PAGE DOWN | fn + DOWN_ARROW
                console.log("fn + DOWN");
                // Down an octave.
                octaveOffset--;
                if (octaveOffset < -2) {
                    octaveOffset = -2;
                }
                UI.drawPiano();
                break;
            case 36: // HOME | fn + LEFT_ARROW
                Playback.playNoteAndGoBackwardInTheSong(); // Find the previous note to play via round robin.
                break;
            case 35: // END | fn + RIGHT_ARROW
                Playback.playNoteAndGoForwardInTheSong(); // Find the next note to play via round robin.
                break;
            case 112:
                console.log("F1");
                break;
            case 113:
                console.log("F2");
                break;
            case 114:
                console.log("F3");
                break;
            case 115:
                console.log("F4");
                break;
            case 116:
                console.log("F5");
                break;
            case 192: // ~ == SHIFT + `
                console.log("SHIFT + `");
                resetEverything();
                break;
            case 32: // SPACE BAR
                console.log("SPACE");
                break;
            case 27: // ESC
                console.log("ESC");
                if (shiftKeyIsDown) {
                    // SHIFT + ESC
                    resetEverything();
                } else {
                    // ESC resets the octave offsets
                    resetOffset();
                }
                break;
            case 8: // BACKSPACE/DEL
                Song.deleteLastGroup();
                break;
            case 9: // TAB
                Song.mergeLastTwoGroups();
                break;
            case 38: // UP
                Highlight.prevTrack();
                break;
            case 40: // DOWN
                Highlight.nextTrack();
                break;
            case 37: // LEFT
                if (metaKeyIsDown) {
                    // CMD + LEFT jumps to the first notegroup of the currently highlighted track.
                    Highlight.firstNoteGroup();
                } else if (shiftKeyIsDown) {
                    // SHIFT + LEFT
                    Playback.playAndGoBackwardOnCurrentTrack();
                } else {
                    Highlight.prevNoteGroup();
                }
                break;
            case 39: // RIGHT
                if (metaKeyIsDown) {
                    // CMD + RIGHT jumps to the last notegroup of the currently highlighted track.
                    Highlight.lastNoteGroup();
                } else if (shiftKeyIsDown) {
                    // SHIFT + RIGHT
                    Playback.playAndGoForwardOnCurrentTrack();
                } else {
                    Highlight.nextNoteGroup();
                }
                break;
            default:
                if (Keyboard.keyCodeToPianoKeyNumber.hasOwnProperty(keyCode)) {
                    App.playOneNote(Keyboard.keyCodeToPianoKeyNumber[keyCode]);
                }
                break;
        }
    }

    export function onKeyUpHandler(e) {
        // update our sharps / flats
        if (App.isFocusedOnSharpsOrFlatsInput()) {
            // DO NOTHING
        } else {
            // Released CTRL or SHIFT
            if (e.ctrlKey) {
                sharpOrFlatModifier = 0;
            } else if (e.shiftKey) {
                sharpOrFlatModifier = 0;
            }
        }
    }

    ////////////////////////////////////////////////////////////

    // The Piano Visualization (Canvas 2D)
    export const WHITE_KEY_WIDTH = 20;
    export const WHITE_KEY_HEIGHT = 120;
    export const BLACK_KEY_WIDTH = 16;
    export const BLACK_KEY_HEIGHT = 72;

    let context2d = null;
    let context2dWidth = 0;
    let context2dHeight = 0;

    export function setCanvasContext(c2d, c2dWidth: number, c2dHeight: number) {
        context2d = c2d;
        context2dWidth = c2dWidth;
        context2dHeight = c2dHeight;
    }

    export function drawPiano() {
        if (!context2d) {
            return;
        }
        let c = context2d;

        // clear the background
        c.fillStyle = "#333";
        c.fillRect(0, 0, context2dWidth, context2dHeight);

        drawWhiteKeys(c);
        drawBlackKeys(c);
        drawKeyLabels(c);
        drawMostRecentGroup(c);
    }

    function drawWhiteKeys(c) {
        c.strokeStyle = "#000";
        c.lineWidth = 0.2;
        c.fillStyle = "#FFF";

        for (let k = 0; k < 52; k++) {
            c.fillRect(k * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
            c.strokeRect(k * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
        }

        // Highlight Middle C in faint red.
        c.fillStyle = "#FCC";
        c.fillRect(23 * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
    }

    function drawBlackKeys(c) {
        c.fillStyle = "#323232";

        for (let octave = 0; octave < 7; octave++) {
            for (let key = 0; key < 7; key++) {
                // A# = key 0; C# = key 2; G# = key 6
                if (key == 1 || key == 4) {
                    continue; // skip B# and E#
                }

                c.fillRect(12 + 20 * (key + octave * 7), 0, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT);
            }
        }

        // highest black key
        c.fillRect(12 + 7 * 7 * 20, 0, 16, 72);
    }

    function drawKeyLabels(c) {
        c.textAlign = "center";

        // draw the piano key numbers for the white keys
        // also draw the note name
        for (let k = 1; k <= 88; k++) {
            let remainder = k % 12;
            if (whiteKeys.includes(remainder)) {
                let octave = Math.floor(k / 12);
                let whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
                let whiteKeyIndex = octave * 7 + whiteKeyNoteIndex;
                let noteLabel = noteLabels[whiteKeyNoteIndex];
                if (noteLabel == "c") {
                    c.font = "bold 13px Tahoma";
                } else {
                    c.font = "13px Tahoma";
                }
                c.fillStyle = "#777";
                c.fillText(noteLabel, whiteKeyIndex * 20 + 10, 100);
                c.font = "12px Consolas";
                c.fillStyle = "#999";
                c.fillText(k, whiteKeyIndex * 20 + 10, 115);
            }
        }

        c.font = "15px Consolas";
        c.fillStyle = "#FFF";
        c.textAlign = "center";

        // xxxx
        // draw the current character to press, under the correct key!
        const offset = (octaveOffset + 1) * 7; // start on A (key 13)
        const len = Keyboard.labels.length;
        for (let i = 0; i < len; i++) {
            c.fillText(Keyboard.labels[i], (i + offset) * 20 + 10, 140);
        }
    }

    // draw the highlighted group?
    function drawMostRecentGroup(c) {
        const trackNumber = Highlight.getCurrentTrackNumber();
        const noteGroupNumber = Highlight.getCurrentNoteGroupNumber();

        const lastGroup = Song.getNoteGroupFromTrack(noteGroupNumber, trackNumber);
        if (!lastGroup) {
            return;
        }

        let notes: Array<Note> = lastGroup.notes;
        for (let n of notes) {
            let remainder = n.pianoNote % 12;

            let octaveIndex = Math.floor((n.pianoNote - 1) / 12);

            c.beginPath();
            if (blackKeys.includes(remainder)) {
                // is it a black key?
                let blackKeyIndex = octaveIndex * 7 + blackKeys.indexOf(remainder);
                // black keys are 16px wide
                c.arc(blackKeyIndex * 20 + 20, 60, 6, 0, 2 * Math.PI, false);
            } else {
                // if white, we map it to one of the 52 white keys
                let whiteKeyIndex = octaveIndex * 7 + whiteKeys.indexOf(remainder);

                // white keys are 20px wide
                c.arc(whiteKeyIndex * 20 + 10, 96, 7, 0, 2 * Math.PI, false);
            }
            c.fillStyle = "rgba(220,220,10,.82)"; // fill the yellow circle
            c.fill();
        }
    }

    ////////////////////////////////////////////////////////////

    export namespace Tracks {
        // Bindings to our React component state.
        // We can query whether a track's checkbox isChecked.
        // We can call setChecked to change the track's checked state.
        let isCheckedCallbacks: Function[] = null;
        let setCheckedCallbacks: Function[] = null;

        const defaultIsCheckedCB = () => {
            console.log("DEFAULT IS-CHECKED. RETURN TRUE.");
            return true;
        };
        const defaultSetCheckedCB = (checked: boolean) => {
            console.log("DEFAULT SET CHECKED: " + checked);
            /* NO-OP */
        };

        export function setup(numTracks: number) {
            isCheckedCallbacks = new Array(numTracks);
            setCheckedCallbacks = new Array(numTracks);
            isCheckedCallbacks.fill(defaultIsCheckedCB);
            setCheckedCallbacks.fill(defaultSetCheckedCB);

            Song.reset();
            for (let t = 0; t < numTracks; t++) {
                Song.addTrack(t);
            }
            Highlight.setupIndexes(numTracks);
        }
        export function getTextFileFromTracks(): string {
            console.log("getTextFileFromTracks Song Version: " + App.getSongVersion());
            const noteGroups = Song.getNoteGroupsFromTracks();
            if (App.getSongVersion() === 1) {
                let noteGroupV1Strings = [];
                noteGroups.forEach((noteGroup) => {
                    noteGroupV1Strings.push(noteGroup.toStringV1());
                });
                return noteGroupV1Strings.join(" ");
            } else {
                // songVersion === 2
                return noteGroups.join(" ");
            }
        }
        export function getTrackNumbersToIncludeInMIDIFile(): number[] {
            const trackNumbersToInclude: number[] = [];
            const numTracks = Song.getNumTracks();
            for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
                if (Tracks.isChecked(trackNumber)) {
                    trackNumbersToInclude.push(trackNumber);
                }
            }
            return trackNumbersToInclude;
        }
        export function setTrackCheckedCallbacks(trackNumber: number, isTrackChecked: Function, setTrackChecked: Function) {
            console.log("setTrackCheckedCallbacks " + trackNumber + " " + typeof isTrackChecked + " " + typeof setTrackChecked);
            if (!isCheckedCallbacks) {
                isCheckedCallbacks = [];
            }
            isCheckedCallbacks[trackNumber] = isTrackChecked;
            if (!setCheckedCallbacks) {
                setCheckedCallbacks = [];
            }
            setCheckedCallbacks[trackNumber] = setTrackChecked;
        }
        export function setChecked(trackNumber: number, checked: boolean) {
            console.log("setChecked " + trackNumber + " => " + checked);

            const setCheckedCB = setCheckedCallbacks[trackNumber];
            if (!setCheckedCB) {
                console.log("NULL SETCHECKED CALLBACK");
                // DO NOTHING
            } else {
                // #TODO: If the value has not changed, do nothing.
                setCheckedCB(checked);
                LocalStorage.saveCheckBoxes();
                Song.resetCache();
            }
        }
        export function isChecked(trackNumber: number): boolean {
            const isCheckedCB = isCheckedCallbacks[trackNumber];
            if (!isCheckedCB) {
                // null or undefined
                return false;
            } else {
                return isCheckedCB();
            }
        }
        export function checkAllNonEmptyTracks() {
            const numTracks = Song.getNumTracks();
            for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
                if (Song.getNumNoteGroupsInTrack(trackNumber) > 0) {
                    Tracks.setChecked(trackNumber, true);
                } else {
                    Tracks.setChecked(trackNumber, false);
                }
            }
        }
        export function getCheckedStateForAllTracks(): boolean[] {
            return isCheckedCallbacks.map((isCheckedCB) => {
                if (!isCheckedCB) {
                    return false; // If the callback is undefined or null, we consider that track "NOT CHECKED".
                } else {
                    let checked = isCheckedCB();
                    console.log(checked);
                    return checked; // Otherwise, we call the callback to determine the current checked state.
                }
            });
        }
        export function setCheckedStateForAllTracks(checkedStateForAllTracks: boolean[]): void {
            for (let trackNumber = 0; trackNumber < checkedStateForAllTracks.length; trackNumber++) {
                const checkedState = checkedStateForAllTracks[trackNumber];
                Tracks.setChecked(trackNumber, checkedState);
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////

namespace Song {
    // Support multi track MIDI songs.
    // When we compose by hand, stick everything in track 0.
    let tracks: Array<Track> = [];

    let cachedNoteGroups: NoteGroup[] = null;

    let recentlyUpdatedTrackNumbers: Set<number> = new Set();

    export function reset() {
        tracks = [];
        Song.resetRecentlyUpdatedTrackNumbers();
        Song.resetCache();
    }

    export function resetCache() {
        cachedNoteGroups = null;
    }

    export function addTrack(trackNumber: number) {
        const track = new Track();
        track.trackNumber = trackNumber;
        tracks.push(track);
        recentlyUpdatedTrackNumbers.add(trackNumber);
    }

    // Return: the new length of the specified track.
    export function addNoteGroupToTrack(noteGroup: NoteGroup, trackNumber: number): number {
        Song.resetCache(); // Every time we modify the tracks, we need to invalidate the cache.

        const track = tracks[trackNumber];
        noteGroup.trackNumber = trackNumber;
        noteGroup.noteNumber = track.length;
        track.push(noteGroup);

        recentlyUpdatedTrackNumbers.add(trackNumber);
        return tracks[trackNumber].length;

        // We call saveAndShowData() elsewhere!
    }

    export function getNumTracks(): number {
        return tracks.length;
    }

    export function getNumNoteGroupsInTrack(trackNumber: number) {
        if (trackNumber < 0 || trackNumber >= tracks.length) {
            return 0;
        } else {
            return tracks[trackNumber].length;
        }
    }

    export function isTrackEmpty(trackNumber: number) {
        return getNumNoteGroupsInTrack(trackNumber) === 0;
    }

    export function getTracksAsJSON(): string {
        return JSON.stringify(tracks);
    }

    export function mergeLastTwoGroups() {
        const trackNumber = Highlight.getCurrentTrackNumber();
        const currTrack = tracks[trackNumber];
        if (currTrack.length >= 2) {
            let mergedNoteGroup: NoteGroup = NoteGroup.merge(currTrack.pop(), currTrack.pop());
            Song.addNoteGroupToTrack(mergedNoteGroup, trackNumber);
            Highlight.setTrackAndNoteGroup(trackNumber, currTrack.length - 1);
            recentlyUpdatedTrackNumbers.add(trackNumber);
            saveAndShowData();
        }
    }

    export function deleteLastGroup() {
        const trackNumber = Highlight.getCurrentTrackNumber();
        tracks[trackNumber].pop();
        Highlight.setTrackAndNoteGroup(trackNumber, tracks[trackNumber].length - 1);
        recentlyUpdatedTrackNumbers.add(trackNumber);
        saveAndShowData();
    }

    export function getNoteGroupFromTrack(noteGroupNumber: number, trackNumber: number): NoteGroup {
        if (trackNumber < 0 || trackNumber >= tracks.length) {
            return null;
        }
        let track = tracks[trackNumber];
        if (noteGroupNumber < 0 || noteGroupNumber >= track.length) {
            return null;
        }
        return track[noteGroupNumber];
    }

    // Retrieve the notegroups to play or save to file.
    // The results are cached! We invalidate the cache anytime we add or subtract notes, or change the state of the checkboxes.
    export function getNoteGroupsFromTracks(): NoteGroup[] {
        if (cachedNoteGroups !== null) {
            return cachedNoteGroups;
        }
        console.log("Recompute Cached NoteGroups!!!");

        const noteGroups: NoteGroup[] = [];
        let currTimeMillis = 0; // Used when our NoteGroups don't have valid timing information (i.e., manual entry).

        const noteGroupPointerForTrack: number[] = []; // Keep pointers to the current NoteGroups we are looking at. One pointer/cursor per track.
        const numTracks = tracks.length;
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            noteGroupPointerForTrack.push(0); // Start a index 0 (the first NoteGroup of each track).
        }

        // Round robin between the tracks until we insert all the NoteGroups properly. Always choose the NoteGroup with the minimum playTime.
        while (true) {
            let minPlayTime = Number.MAX_VALUE;
            let nextNoteGroup: NoteGroup = null;
            let nextNoteGroupTrack: Track = null; // Which track contains the next note group to play?

            // Loop through all the tracks to find the next NoteGroup to play.
            for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
                const currTrack = tracks[trackNumber];
                const currTrackLength = currTrack.length;
                const currNoteGroupPointer = noteGroupPointerForTrack[trackNumber];

                if (currTrackLength === 0 || !UI.Tracks.isChecked(trackNumber) || currNoteGroupPointer >= currTrackLength) {
                    // Ignore this track if:
                    //   it is empty
                    //   it is not checked
                    //   we have already finished looking at it
                    continue;
                } else {
                    const noteGroup = currTrack[currNoteGroupPointer];
                    if (noteGroup.playTimeMillis < minPlayTime) {
                        minPlayTime = noteGroup.playTimeMillis;
                        nextNoteGroup = noteGroup;
                        nextNoteGroupTrack = currTrack;
                    }
                }
            }

            // If we did not find any NoteGroups, we're done!
            if (!nextNoteGroup) {
                break; // break out of the while(true) loop.
            } else {
                const ng: NoteGroup = nextNoteGroup.copy();
                if (ng.playTimeMillis === -1) {
                    ng.playTimeMillis = currTimeMillis;
                }

                const t = nextNoteGroupTrack.trackNumber;
                const noteNumber = noteGroupPointerForTrack[t];
                ng.noteNumber = noteNumber;

                noteGroupPointerForTrack[t]++;

                noteGroups.push(ng);
                currTimeMillis = ng.playTimeMillis + TIME_BETWEEN_NOTEGROUPS;
            }
        }

        cachedNoteGroups = noteGroups;
        return noteGroups;
    }

    export function getNoteGroupID(trackNumber, noteGroupNumber) {
        return `t${trackNumber}_n${noteGroupNumber}`;
    }

    export function getRecentlyUpdatedTrackNumbersAsArray(): number[] {
        return Array.from(recentlyUpdatedTrackNumbers);
    }

    export function resetRecentlyUpdatedTrackNumbers() {
        recentlyUpdatedTrackNumbers = new Set();
    }
}

const _Playback_NS = Playback;
const _Song_NS = Song;
const _UI_NS = UI;
const _Tracks_NS = UI.Tracks;

namespace App {
    export const Playback = _Playback_NS;
    export const Song = _Song_NS;
    export const UI = _UI_NS;
    export const Tracks = _Tracks_NS;

    let songVersion: number = Constants.MIN_SONG_VERSION; // We need to update this every time the redux store changes!
    export function getSongVersion() {
        return songVersion;
    }
    export function setSongVersion(v: number) {
        songVersion = v;
    }

    // Dispatch events to modify Redux store.
    export function setDispatchFunction(d: Function) {
        dispatch = d;
    }

    // Once the DOM is ready, call App.start()
    export function start() {
        console.log("App.start()");
        MIDIPianoInput.setup();
        LocalStorage.load();
        UI.showNoteGroupsForTracks();
        UI.setupCopyHandler();
        UI.drawPiano();
    }

    export function startAudio() {
        piano = new Instrument();
    }

    export function onKeyUp(e) {
        UI.onKeyUpHandler(e);
    }

    export function onKeyDown(e) {
        UI.onKeyDownHandler(e);
    }

    export function saveSongVersionToLocalStorage(ver: number) {
        App.setSongVersion(ver);
        console.log("saveSongVersionToLocalStorage " + ver);
        LocalStorage.saveVersionToggle(ver);
    }

    export function fillTracksWithNoteGroupsExtractedFromMIDIEvents(midiFile, midiEvents) {
        console.log("MIDI File Passed In: " + midiFile);
        if (!midiFile) {
            return;
        }

        Tracks.setup(midiFile.tracks.length);

        console.log("FILL TRACKS XXX");

        // Remember the most recently processed event so that we can merge notes that are played at the same time and on the same track.
        let lastNoteGroup: NoteGroup = null;
        let lastPlayTime = -1;
        let lastTrackNumber = -1;

        // Convert from MIDI events to NoteGroups
        for (const event of midiEvents) {
            const type = event.type;
            const subtype = event.subtype;
            // let status = (event.subtype << 4) + event.channel;
            // let statusCodeHexString = '0x' + status.toString(16).toUpperCase();
            let playTime = event.playTime; // time in milliseconds
            playTime = Math.round(playTime * 1000) / 1000; // round it to the nearest 0.001
            const midiNoteNum = event.param1;
            const velocity = event.param2;
            const pianoNoteNum = MIDIUtils.m2p(midiNoteNum);
            const noteToPlay = new Note(pianoNoteNum, 1.0 /* duration */, velocity); // TODO: Support duration someday?
            console.log("VELOCITY " + velocity);
            let trackNumber = event.track; // possibly undefined!
            if (!trackNumber) {
                trackNumber = 0; // We will assign events with undefined trackNumbers to track 0.
            }

            if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                if (playTime <= lastPlayTime + TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES && trackNumber === lastTrackNumber) {
                    // Merge all notes starting at the same time and on the same track into a single NoteGroup.
                    lastNoteGroup.addNote(noteToPlay);
                } else {
                    let noteGroup = new NoteGroup(noteToPlay, playTime, trackNumber);
                    Song.addNoteGroupToTrack(noteGroup, trackNumber);
                    lastNoteGroup = noteGroup;
                    lastTrackNumber = trackNumber;
                    lastPlayTime = playTime;
                }
            } else {
                // OTHER EVENTS
                console.log("Unhandled Event:");
                MIDIFileIO.printTypeAndSubtype(type, subtype);
            }
        }

        saveAndShowData();
    }

    // When we hover over the Download MIDI | TEXT links, we update
    // the href attributes so that we download the correct data.
    export function getDownloadData_TEXT(): string {
        // GENERATE THE TEXT FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        // A textual representation of the song:
        //   V1 => e.g., 40 42 44 45 40.47
        //   V2 => e.g., [24.36 @ 0] [17.29 @ 2730] [36 @ 2904] [41 @ 3029] [44 @ 3152]
        const text = Tracks.getTextFileFromTracks();
        const base64Text = btoa(text); // base 64 encoding
        return base64Text;
    }

    // When we hover over the Download MIDI | TEXT links, we update
    // the href attributes so that we download the correct data.
    export function getDownloadData_MIDI(): string {
        // GENERATE THE MIDI FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        const trackNumbersToInclude = Tracks.getTrackNumbersToIncludeInMIDIFile();
        const midiFile = MIDIFileIO.createFileFromTracks(trackNumbersToInclude, Song.getNoteGroupsFromTracks());
        const base64Text = btoa(midiFile); // base 64 encoding
        return base64Text;
    }

    export function playOneNote(pianoKeyBeforeModifiers, applyModifiers: boolean = true) {
        // get the name of the note we are about to play
        const remainder = pianoKeyBeforeModifiers % 12;
        const whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
        const noteLabel = noteLabels[whiteKeyNoteIndex];

        let modifier = 0;
        if (applyModifiers) {
            modifier = sharpOrFlatModifier; // The user is holding down SHIFT or CTRL

            // is this note auto-sharped, due to the key signature?
            if (App.isNoteSharp(noteLabel)) {
                modifier++; // raise the sharp a half-step!
            }
            // is this note auto-flatted, due to the key signature?
            if (App.isNoteFlat(noteLabel)) {
                modifier--; // lower the note a half-step!
            }
        }

        const pianoKeyNumber = pianoKeyBeforeModifiers + modifier + octaveOffset * 12;
        if (pianoKeyNumber < 1 || pianoKeyNumber > 88) {
            return;
        }

        const trackNumber: number = Highlight.getCurrentTrackNumber();
        const trackLength: number = Song.addNoteGroupToTrack(new NoteGroup(new Note(pianoKeyNumber)), trackNumber);
        Tracks.setChecked(trackNumber, true);

        App.playPianoNote(pianoKeyNumber);

        Highlight.setTrackAndNoteGroup(trackNumber, trackLength - 1);
        saveAndShowData();
    }

    export function playPianoNote(pianoKeyNumber, velocity = 127.0) {
        if (piano === null) {
            console.log("playPianoNote: Piano has not been initialized.");
            return;
        }
        const duration = 1.0; // 0.125, 0.25, 0.5, 1.0, 2.0;
        piano.play(pianoKeyNumber, duration, velocity / 127.0);
    }

    export function loadFirstFile(fileList: any) {
        if (fileList.length > 0) {
            const file = fileList[0]; // Read the first file.
            MIDIFileIO.readFileAsync(file).then((fileName) => {
                dispatch({ type: Actions.FileChooser.onFileLoaded });
            });
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    let isFocusedOnInputsCB: Function = () => false;
    let getSharpsCB: Function = () => "";
    let getFlatsCB: Function = () => "";

    export function setHandlersForSharpsAndFlatsInput(isFocused: Function, getSharps: Function, getFlats: Function) {
        isFocusedOnInputsCB = isFocused;
        getSharpsCB = getSharps;
        getFlatsCB = getFlats;
    }

    export function isFocusedOnSharpsOrFlatsInput(): boolean {
        return isFocusedOnInputsCB();
    }

    export function getSharps(): string {
        return getSharpsCB();
    }

    export function getFlats(): string {
        return getFlatsCB();
    }

    export function isNoteSharp(noteLabel: string): boolean {
        // Case insensitive test. Does the list of sharps contain the noteLabel?
        return new RegExp(noteLabel, "i").test(App.getSharps());
    }

    export function isNoteFlat(noteLabel: string): boolean {
        // Case insensitive test. Does the list of flats contain the noteLabel?
        return new RegExp(noteLabel, "i").test(App.getFlats());
    }
}

export default App;
