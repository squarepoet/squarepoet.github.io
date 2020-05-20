declare var Instrument: any; // musical.min.js

export default class GuitarAuthorV1 {
    //////////////////////////////////////////////////////////////////////////////////////////////////

    public setSharps: (s: string) => void;
    public setFlats: (s: string) => void;
    public setGuitarTab: (s: string) => void;

    public getSharps: () => string;
    public getFlats: () => string;
    public getGuitarTab: () => string;

    public getGuitarTabTextArea: () => HTMLTextAreaElement;
    public getSharpsInput: () => HTMLInputElement;
    public getFlatsInput: () => HTMLInputElement;
    public getGuitarCanvas: () => HTMLCanvasElement;
l
    //////////////////////////////////////////////////////////////////////////////////////////////////


    private FRET_DX: 85;
    private FRET_OFFSET: 20;
    private noteOffsetForString = [0, 7, 2, 10, 5, 0, 7]; // [X] E B G D A E

    private piano = null;

    // Only instantiate this on the client. Make sure you never instantiate GuitarAuthorV1 in server side JS!
    constructor() {
        console.log("GuitarAuthorV1 constructor");
        this.piano = new Instrument("piano");
    }

    // Converts a piano note (C4 == 40) to MIDI (C4 == 60)
    // This API expects a negative number to signify MIDI.
    private pianoNote(num) {
        return -(num + 20);
    }

    // which character to type to get the corresponding note
    private keyboardLabels = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ];
    private fretOffset = 0;
    private stringOffset = 0;

    private noteGroups = [];

    private noteLabels = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // The zeroth fret of string 2 corresponds to piano key #39 (B just under Middle C).
    private stringToPianoKey = {
        1: 44, // E
        2: 39, // B
        3: 35, // G
        4: 30, // D
        5: 25, // A
        6: 20, // E
    };

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
        var newText = this.noteGroups.join(" ");
        this.setGuitarTab(newText);
        this.drawGuitar();
    }

    // XXXX32 => { 6:'X', 5:'X', 4:'X', 3:'X', 2:'3', 1:'2' }
    splitNoteGroup(noteGroup) {
        var result = { 6: "X", 5: "X", 4: "X", 3: "X", 2: "X", 1: "X" };

        if (noteGroup.length == 6) {
            //
            var items = noteGroup.toUpperCase().split("").reverse();
            for (var s = 1; s <= 6; s++) {
                if (items[s - 1] != "X") {
                    result[s] = items[s - 1];
                }
            }
        } else {
            // e.g., 3_2
            var string_fret = noteGroup.split("_");
            var s = string_fret[0];
            var f = string_fret[1];
            result[s] = f;
        }

        return result;
    }

    mergeGroupIntoArray(g, arr) {
        console.log(g + " " + arr);
        if (g.length == 6) {
            //
            var items = g.toUpperCase().split("");
            for (var i = 0; i < 6; i++) {
                if (items[i] != "X") {
                    arr[i] = items[i];
                }
            }
        } else {
            // e.g., 3_2
            var string_fret = g.split("_");
            var s = string_fret[0];
            var f = parseInt(string_fret[1]);
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

        var lastGroup = this.noteGroups.pop();
        var lastLastGroup = this.noteGroups.pop();

        var mergedNoteGroup = ["X", "X", "X", "X", "X", "X"];

        this.mergeGroupIntoArray(lastLastGroup, mergedNoteGroup);
        this.mergeGroupIntoArray(lastGroup, mergedNoteGroup);

        this.noteGroups.push(mergedNoteGroup.join(""));

        this.saveAndShowData();
    }

    // 1040 x 280 tall.
    drawStringsAndFrets(c) {
        // 0th fret
        c.fillStyle = "rgba(255,255,255,0.1)";
        c.fillRect(0, 0, 30, 280);

        c.lineWidth = 0.9;

        // 6 strings
        for (var s = 1; s <= 6; s++) {
            c.beginPath();
            c.strokeStyle = "rgba(255,255,255, " + 0.25 * s + ")";
            c.moveTo(0, s * 40);
            c.lineTo(1040, s * 40);
            c.stroke();
        }

        c.beginPath();
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255,255,255, 0.5)";

        // 11 vertical lines (handling frets 0 => 12)
        for (var f = 1; f <= 11; f++) {
            var x = f * this.FRET_DX + this.FRET_OFFSET;
            c.beginPath();
            c.moveTo(x, 0);
            c.lineTo(x, 280);
            c.stroke();
        }
    }

    drawMostRecentGroup(c) {
        if (this.noteGroups.length == 0) {
            return;
        }

        var lastGroup = this.noteGroups[this.noteGroups.length - 1]; // the last item
        var items = this.splitNoteGroup(lastGroup);

        for (var s = 1; s <= 6; s++) {
            var f = items[s];
            if (f == "X") {
                continue;
            }
            f = parseInt(f);

            var localFretOffset = f == 0 ? 15 : this.FRET_OFFSET - this.FRET_DX / 2;
            var x = f * this.FRET_DX + localFretOffset;
            var y = s * 40;

            c.beginPath();
            c.arc(x, y, 14, 0, 2 * Math.PI);
            c.fillStyle = "rgba(180,180,0,0.5)";
            c.fill();
        }
    }

    drawGuitar() {
        let elem:HTMLCanvasElement = this.getGuitarCanvas();

        if (!elem || !elem.getContext) {
            return;
        }
        var c = elem.getContext("2d");
        if (!c) {
            return;
        }

        // clear the background
        c.fillStyle = "#181818";
        c.fillRect(0, 0, elem.width, elem.height);

        this.drawStringsAndFrets(c);
        this.drawKeyLabels(c);
        this.drawMostRecentGroup(c);
    }

    drawKeyLabels(c) {
        c.font = "14px Tahoma";
        c.fillStyle = "#FFF";
        c.strokeStyle = "rgba(255,255,255,0.86)";
        c.lineJoin = "round";
        c.lineWidth = 7;

        // draw the note name
        for (var s = 1; s <= 6; s++) {
            for (var f = 0; f <= 12; f++) {
                var localFretOffset = f == 0 ? 10 : 15 - this.FRET_DX / 2;
                var noteOffset = this.noteOffsetForString[s];
                var noteLabel = this.noteLabels[(noteOffset + f) % 12];
                var x = f * this.FRET_DX + localFretOffset;
                var y = s * 40 + 6;
                c.strokeText(noteLabel, x, y);
                c.fillText(noteLabel, x, y);
            }
        }

        // draw the keyboard labels
        c.font = "14px Consolas";
        c.fillStyle = "#FFF";
        for (var s = 1; s <= 4; s++) {
            for (var f = 0; f < 10; f++) {
                var keyLabel = this.keyboardLabels[s - 1][f];
                var adjustedFret = f + this.fretOffset;
                var localFretOffset = adjustedFret == 0 ? 10 : 15 - this.FRET_DX / 2;
                var x = adjustedFret * this.FRET_DX + localFretOffset;
                var y = (s + this.stringOffset) * 40 + 21;
                c.fillText(keyLabel, x, y);
            }
        }
    }

    loadNoteGroupsFromGuitarTab(guitarTab:string) {
        var guitarTabText = guitarTab.trim();
        if (guitarTabText == "") {
            this.noteGroups = [];
        } else {
            this.noteGroups = guitarTabText.split(" ");
        }
        this.setGuitarTab(this.noteGroups.join(" "));
    }

    play(keyCode, sharpModifier) {
        if (!this.keyCodeToFret.hasOwnProperty(keyCode)) {
            return;
        }

        var adjustedFret = this.keyCodeToFret[keyCode] + this.fretOffset;
        var adjustedString = this.keyCodeToString[keyCode] + this.stringOffset;

        var noteOffset = this.noteOffsetForString[adjustedString];
        var noteLabel = this.noteLabels[(noteOffset + adjustedFret) % 12].toLowerCase();

        // is this note auto-sharped, due to the key signature?
        if (this.getSharps().indexOf(noteLabel) != -1) {
            sharpModifier++; // raise the sharp a half-step!
        }
        // is this note auto-flatted, due to the key signature?
        if (this.getFlats().indexOf(noteLabel) != -1) {
            sharpModifier--; // lower the note a half-step!
        }

        adjustedFret += sharpModifier;

        this.noteGroups.push(adjustedString + "_" + adjustedFret); // push the string onto our array

        var pianoKeyNumber = this.stringToPianoKey[adjustedString] + adjustedFret;
        this.piano.tone({ pitch: this.pianoNote(pianoKeyNumber), duration: 1.0 });
        this.saveAndShowData();
    }

    onKeyDown(e: KeyboardEvent) {
        // if ($sharps.is(":focus") || $flats.is(":focus")) {
        //     return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
        // }

        if (e.keyCode == 91 || e.keyCode == 93) {
            // CMD KEY on Mac
            // $text.select();
        }

        if (e.metaKey) {
            if (e.keyCode == 88 || e.keyCode == 67) {
                // CMD + X or CMD + C
                setTimeout(this.resetData, 100);
            }
            return;
        }

        if (e.altKey) {
            return;
        }

        var sharpModifier = 0;
        if (e.ctrlKey) {
            sharpModifier = -1;
        } else if (e.shiftKey) {
            sharpModifier = +1;
        }

        e.preventDefault();
        switch (e.keyCode) {
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
            case 8: // BACKSPACE/DEL
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
                this.drawGuitar();
                break;
            case 39: // RIGHT
                // shift the keyboard offset to the right by 1
                this.fretOffset++;
                if (this.fretOffset > 3) {
                    this.fretOffset = 3;
                }
                this.drawGuitar();
                break;
            case 38: // UP
                // shift the keyboard offset up by 1
                this.stringOffset--;
                if (this.stringOffset < 0) {
                    this.stringOffset = 0;
                }
                this.drawGuitar();
                break;
            case 40: // DOWN
                // shift the keyboard offset down by 1
                this.stringOffset++;
                if (this.stringOffset > 2) {
                    this.stringOffset = 2;
                }
                this.drawGuitar();
                break;
            default:
                this.play(e.keyCode, sharpModifier);
                break;
        }
    }

    onKeyUp(e: KeyboardEvent) {
        // update our sharps
        let sharpsInputElement = this.getSharpsInput();
        if (sharpsInputElement === document.activeElement) {
            this.setSharps(this.getSharps());
        }

        // update our flats
        let flatsInputElement = this.getFlatsInput();
        if (flatsInputElement === document.activeElement) {
            this.setFlats(this.getFlats());
        }
    }
}
