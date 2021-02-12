import SharpsAndFlatsManager from "apps/author/piano/shared/SharpsAndFlatsManager";
import Instrument, { PianoType } from "apps/shared/sound/Instrument";

//////////////////////////////////////////////////////////////////////////////////////////////////

let piano: Instrument = null;

const CANVAS_WIDTH = 1040;
const CANVAS_HEIGHT = 280;

const FRET_DX = 85;
const FRET_OFFSET = 20;

const NOTE_LABELS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// The zeroth fret of string 2 corresponds to piano key #39 (B just under Middle C).
const STRING_TO_PIANOKEY = {
    1: 44, // E
    2: 39, // B
    3: 35, // G
    4: 30, // D
    5: 25, // A
    6: 20, // E
};

export default class GuitarAuthorV1 {
    //////////////////////////////////////////////////////////////////////////////////////////////////

    public setGuitarTab: (s: string) => void;

    public getGuitarTab: () => string;

    public getGuitarTabTextArea: () => HTMLTextAreaElement;
    public getGuitarCanvas: () => HTMLCanvasElement;

    //////////////////////////////////////////////////////////////////////////////////////////////////

    private noteOffsetForString = [0, 7, 2, 10, 5, 0, 7]; // [X] E B G D A E

    private piano: any = null;
    private fretOffset = 0;
    private stringOffset = 0;

    private noteGroups: string[] = [];

    constructor() {
        this.setupCopyHandler();
    }

    // Originally From Piano Author V2. We should probably merge it somehow!
    setupCopyHandler() {
        document.querySelector("html").addEventListener("copy", (e: ClipboardEvent) => {
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData("text/plain", this.getNoteGroupsAsSpaceDelimitedString());
            }
        });
        document.querySelector("html").addEventListener("cut", (e: ClipboardEvent) => {
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData("text/plain", this.getNoteGroupsAsSpaceDelimitedString());
            }
            setTimeout(() => {
                this.resetData();
            }, 100);
        });
    }

    // which character to type to get the corresponding note
    private keyboardLabels = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ];

    private keyCodeToFret = {
        90: 0, // z
        88: 1, // x
        67: 2, // c
        86: 3, // v
        66: 4, // b
        78: 5, // n
        77: 6, // m
        188: 7, // ,
        190: 8, // .
        191: 9, // /
        //
        65: 0, // a => G
        83: 1, // s => A
        68: 2, // d => B
        70: 3, // f => C4
        71: 4, // g => D
        72: 5, // h => E
        74: 6, // j => F
        75: 7, // k => G
        76: 8, // l => A
        186: 9, // ; => B Chrome
        59: 9, // ; => B Firefox
        222: 10, // ' => C5
        //
        81: 0, // q => G
        87: 1, // w => A
        69: 2, // e => B
        82: 3, // r => C5
        84: 4, // t => D
        89: 5, // y => E
        85: 6, // u => F
        73: 7, // i => G
        79: 8, // o => A
        80: 9, // p => B
        219: 10, // [ => C6
        221: 11, // ] => D
        220: 12, // \ => E
        //
        49: 0, // 1 => G
        50: 1, // 2 => A
        51: 2, // 3 => B
        52: 3, // 4 => C6
        53: 4, // 5 => D
        54: 5, // 6 => E
        55: 6, // 7 => F
        56: 7, // 8 => G
        57: 8, // 9 => A
        48: 9, // 0 => B
        189: 10, // - => C7
        187: 11, // = => D
    };

    // Maps a key to the guitar string
    keyCodeToString = {
        90: 4, // z
        88: 4, // x
        67: 4, // c
        86: 4, // v
        66: 4, // b
        78: 4, // n
        77: 4, // m
        188: 4, // ,
        190: 4, // .
        191: 4, // /
        //
        65: 3, // a => G
        83: 3, // s => A
        68: 3, // d => B
        70: 3, // f => C4
        71: 3, // g => D
        72: 3, // h => E
        74: 3, // j => F
        75: 3, // k => G
        76: 3, // l => A
        186: 3, // ; => B in Chrome
        59: 3, // ; => B in Firefox
        222: 3, // ' => C5
        //
        81: 2, // q => G
        87: 2, // w => A
        69: 2, // e => B
        82: 2, // r => C5
        84: 2, // t => D
        89: 2, // y => E
        85: 2, // u => F
        73: 2, // i => G
        79: 2, // o => A
        80: 2, // p => B
        219: 2, // [ => C6
        221: 2, // ] => D
        220: 2, // \ => E
        //
        49: 1, // 1 => G
        50: 1, // 2 => A
        51: 1, // 3 => B
        52: 1, // 4 => C6
        53: 1, // 5 => D
        54: 1, // 6 => E
        55: 1, // 7 => F
        56: 1, // 8 => G
        57: 1, // 9 => A
        48: 1, // 0 => B
        189: 1, // - => C7
        187: 1, // = => D
    };

    // resets the key offset
    resetOffsets() {
        this.fretOffset = 0;
        this.stringOffset = 0;
        this.saveAndShowData();
    }

    resetData() {
        this.noteGroups = [];
        this.saveAndShowData();
    }

    deleteLastGroup() {
        this.noteGroups.pop();
        this.saveAndShowData();
    }

    saveAndShowData() {
        this.updateGuitarTabInTextArea();
        this.drawFrets();
    }

    updateGuitarTabInTextArea() {
        this.setGuitarTab(this.getNoteGroupsAsSpaceDelimitedString());
    }

    getNoteGroupsAsSpaceDelimitedString() {
        return this.noteGroups.join(" ");
    }

    // XXXX32 => { 6:'X', 5:'X', 4:'X', 3:'X', 2:'3', 1:'2' }
    splitNoteGroup(noteGroup: string) {
        let result = { 6: "X", 5: "X", 4: "X", 3: "X", 2: "X", 1: "X" };

        if (noteGroup.length == 6) {
            let items = noteGroup.toUpperCase().split("").reverse();
            for (let s = 1; s <= 6; s++) {
                if (items[s - 1] != "X") {
                    result[s] = items[s - 1];
                }
            }
        } else {
            // e.g., 3_2
            let string_fret = noteGroup.split("_");
            let s: string = string_fret[0];
            let f = string_fret[1];
            result[s] = f;
        }

        return result;
    }

    mergeGroupIntoArray(g, arr) {
        console.log(g + " " + arr);
        if (g.length == 6) {
            //
            let items = g.toUpperCase().split("");
            for (let i = 0; i < 6; i++) {
                if (items[i] != "X") {
                    arr[i] = items[i];
                }
            }
        } else {
            // e.g., 3_2
            let string_fret = g.split("_");
            let s = string_fret[0];
            let f: number | string = parseInt(string_fret[1]);
            if (f > 9) {
                // Hex!
                f = f.toString(16).toUpperCase();
            }
            arr[6 - s] = f;
        }
    }

    // 2_3 1_2 => XXXX32
    // 4_0 XXX232 => XX0232
    // XX02XX XXXX32 => XX0232
    mergeLastTwoGroups() {
        if (this.noteGroups.length < 2) {
            return;
        }

        let lastGroup = this.noteGroups.pop();
        let lastLastGroup = this.noteGroups.pop();

        let mergedNoteGroup = ["X", "X", "X", "X", "X", "X"];

        this.mergeGroupIntoArray(lastLastGroup, mergedNoteGroup);
        this.mergeGroupIntoArray(lastGroup, mergedNoteGroup);

        this.noteGroups.push(mergedNoteGroup.join(""));

        this.saveAndShowData();
    }

    // 1040 x 280 tall.
    drawStringsAndFrets(c) {
        // 0th fret
        c.fillStyle = "rgba(255,255,255,0.1)";
        c.fillRect(0, 0, 30, CANVAS_HEIGHT);

        c.lineWidth = 1;

        // 6 strings. Horizontal lines.
        for (let s = 1; s <= 6; s++) {
            c.beginPath();
            let opacity = 0.08 * s;
            c.strokeStyle = `rgba(255,255,255,${opacity})`;
            c.moveTo(0, s * 40);
            c.lineTo(CANVAS_WIDTH, s * 40);
            c.stroke();
        }

        // Fret Lines
        c.beginPath();
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255,255,255,0.5)";

        // 11 vertical lines (handling frets 0 => 12)
        for (let f = 1; f <= 11; f++) {
            let x = f * FRET_DX + FRET_OFFSET;
            c.beginPath();
            c.moveTo(x, 0);
            c.lineTo(x, 280);
            c.stroke();
        }
    }

    getMostRecentNoteGroup() {
        let lastGroup = this.noteGroups[this.noteGroups.length - 1]; // the last item
        let items = this.splitNoteGroup(lastGroup);
        return items;
    }

    playMostRecentGroup() {
        if (this.noteGroups.length === 0) {
            console.log("No note groups to play.");
            return;
        }

        let items = this.getMostRecentNoteGroup();
        for (let s = 1; s <= 6; s++) {
            let f = items[s];
            if (f == "X") {
                continue;
            }
            f = parseInt(f);

            let pianoKeyNumber = STRING_TO_PIANOKEY[s] + f;
            this.playPianoNote(pianoKeyNumber);
        }
    }

    playPianoNote(pianoKeyNumber: number) {
        let duration = 0.8;
        console.log("PLAY " + pianoKeyNumber);

        piano.play(pianoKeyNumber, 0.4 /* seconds */, 0.8 /* volume */);

        /*
        TONE JS RIGHT HERE 
        COPY THE WAVETABLE SYNTHESIS FROM MUSICAL.JS????
        NEXT............

        See: https://tonejs.github.io/examples/oscillator

        Test Oscillator
        WTF is partials??? It it what we are looking for?

        Integrate it into 
import Piano from "apps/shared/tone/Piano";
        */
        /*

const osc = new Tone.Oscillator("F3").toDestination().start();
setInterval(() => {
	// generate 8 random partials
	osc.partials = new Array(8).map(() => 0);
}, 1000);

        */
    }

    drawMostRecentGroup(c) {
        if (this.noteGroups.length == 0) {
            return;
        }

        let items = this.getMostRecentNoteGroup();
        for (let s = 1; s <= 6; s++) {
            let f = items[s];
            if (f == "X") {
                continue;
            }
            f = parseInt(f);

            let localFretOffset = f == 0 ? 15 : FRET_OFFSET - FRET_DX / 2;
            let x = f * FRET_DX + localFretOffset;
            let y = s * 40;

            c.beginPath();
            c.arc(x, y, 14, 0, 2 * Math.PI);
            c.fillStyle = "rgba(180,180,0,0.5)";
            c.fill();
        }
    }

    drawFrets() {
        let elem: HTMLCanvasElement = this.getGuitarCanvas();
        if (!elem || !elem.getContext) {
            return;
        }
        let c = elem.getContext("2d");
        if (!c) {
            return;
        }

        // clear the background
        c.fillStyle = "#131313";
        c.fillRect(0, 0, elem.width, elem.height);

        this.drawStringsAndFrets(c);
        this.drawKeyLabels(c);
        this.drawMostRecentGroup(c);
    }

    drawKeyLabels(c) {
        c.font = "14px Tahoma";
        c.lineJoin = "round";
        c.lineWidth = 6;

        // draw the note name
        for (let s = 1; s <= 6; s++) {
            for (let f = 0; f <= 12; f++) {
                let localFretOffset = f == 0 ? 10 : 15 - FRET_DX / 2;
                let noteOffset = this.noteOffsetForString[s];
                let noteLabel = NOTE_LABELS[(noteOffset + f) % 12];
                if (noteLabel === "C") {
                    c.fillStyle = "#F55";
                } else {
                    c.fillStyle = "#FFF";
                }
                let x = f * FRET_DX + localFretOffset;
                let y = s * 40 + 6;
                c.fillText(noteLabel, x, y);
            }
        }

        // draw the keyboard labels
        c.font = "15px Hack, Consolas, Courier";
        c.fillStyle = "#FF4";
        for (let s = 1; s <= 4; s++) {
            for (let f = 0; f < 10; f++) {
                let keyLabel = this.keyboardLabels[s - 1][f];
                let adjustedFret = f + this.fretOffset;
                let localFretOffset = adjustedFret == 0 ? 10 : 15 - FRET_DX * 0.5;
                let x = adjustedFret * FRET_DX + localFretOffset;
                let y = (s + this.stringOffset) * 40 + 22;
                c.fillText(keyLabel, x, y);
            }
        }
    }

    loadNoteGroupsFromGuitarTab(guitarTab: string) {
        let guitarTabText = guitarTab.trim();
        if (guitarTabText == "") {
            this.noteGroups = [];
        } else {
            this.noteGroups = guitarTabText.split(" ");
        }
        this.updateGuitarTabInTextArea();
    }

    play(keyCode, accidental: number) {
        if (!this.keyCodeToFret.hasOwnProperty(keyCode)) {
            return;
        }

        let adjustedFret = this.keyCodeToFret[keyCode] + this.fretOffset;
        console.log("Adjusted Fret " + adjustedFret);
        const adjustedString = this.keyCodeToString[keyCode] + this.stringOffset;

        const noteOffset = this.noteOffsetForString[adjustedString];
        const noteLabel = NOTE_LABELS[(noteOffset + adjustedFret) % 12].toLowerCase();

        // is this note auto-sharped, due to the key signature?
        if (SharpsAndFlatsManager.isNoteSharp(noteLabel)) {
            accidental++; // raise the note a half-step!
        }
        // is this note auto-flattened, due to the key signature?
        if (SharpsAndFlatsManager.isNoteFlat(noteLabel)) {
            accidental--; // lower the note a half-step!
        }

        adjustedFret += accidental;

        this.noteGroups.push(adjustedString + "_" + adjustedFret); // push the string onto our array

        const pianoKeyNumber = STRING_TO_PIANOKEY[adjustedString] + adjustedFret;

        this.playPianoNote(pianoKeyNumber);

        this.saveAndShowData();
    }

    onKeyDown(e: KeyboardEvent) {
        if (!piano) {
            console.log("Init Web Audio");
            piano = new Instrument(PianoType.Sampled_1);
            piano.initWebAudio();
        }

        // CMD KEY on Mac
        // if (e.keyCode == 91 || e.keyCode == 93) {
        //     DO NOTHING, because our COPY/CUT handlers are defined in setupCopyHandler().
        // }
        //
        // if (e.metaKey) {
        //     CMD + X or CMD + C
        //     if (e.keyCode == 88 || e.keyCode == 67) {
        //         DO NOTHING
        //     }
        //     return;
        // }

        // e.metaKey => CMD (91 is LEFT CMD & 93 is RIGHT CMD)
        if (e.metaKey) {
            if (e.keyCode == 37 || e.keyCode == 39) {
                // DO NOTHING. Fall through so that we can do CMD + LEFT ARROW and CMD + RIGHT ARROW.
            } else {
                // Ignore when we have the CMD pressed down, so that we can use the browser's hotkeys.
                return;
            }
        }

        if (e.altKey) {
            return;
        }

        let accidentalModifier = 0;
        if (e.ctrlKey) {
            // FLAT: Lower the note by a half step.
            accidentalModifier = -1;
        } else if (e.shiftKey) {
            // SHARP: Raise the note by a half step.
            accidentalModifier = +1;
        }

        e.preventDefault();
        switch (e.keyCode) {
            case 32: // SPACEBAR
                this.playMostRecentGroup();
                break;
            case 192: // ~ == SHIFT + `
                console.log("SHIFT + `");
                this.resetData();
                break;
            case 27: // ESC
                if (e.shiftKey) {
                    this.resetData();
                } else {
                    this.resetOffsets();
                }
                break;
            case 8: // BACKSPACE
                this.deleteLastGroup();
                break;
            case 9: // TAB
                this.mergeLastTwoGroups();
                // TODO: Also support unmerging?
                break;
            case 37: // LEFT
                // shift the keyboard offset to the left by 1
                this.fretOffset--;
                if (this.fretOffset < 0) {
                    this.fretOffset = 0;
                }
                this.drawFrets();
                break;
            case 39: // RIGHT
                // shift the keyboard offset to the right by 1
                this.fretOffset++;
                if (this.fretOffset > 3) {
                    this.fretOffset = 3;
                }
                this.drawFrets();
                break;
            case 38: // UP
                // shift the keyboard offset up by 1
                this.stringOffset--;
                if (this.stringOffset < 0) {
                    this.stringOffset = 0;
                }
                this.drawFrets();
                break;
            case 40: // DOWN
                // shift the keyboard offset down by 1
                this.stringOffset++;
                if (this.stringOffset > 2) {
                    this.stringOffset = 2;
                }
                this.drawFrets();
                break;
            default:
                this.play(e.keyCode, accidentalModifier);
                break;
        }
    }
}
