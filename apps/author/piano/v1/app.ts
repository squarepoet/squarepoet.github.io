import Piano, { PianoType } from "apps/shared/sound/Piano";

export const CANVAS_WIDTH: number = 2080;
export const CANVAS_HEIGHT: number = 300;

let piano: Piano = null;

console.log("/piano/v1/App.ts Loaded");

function setTextArea(text: string) {
    let textArea: HTMLTextAreaElement = document.getElementById("textarea") as HTMLTextAreaElement;
    textArea.value = text;
}

function selectTextArea() {
    (document.getElementById("textarea") as HTMLTextAreaElement).select();
}

function copyTextArea() {
    document.execCommand("copy");
}

function setSharps(text: string) {
    let sharpsInput = document.getElementById("sharps-text") as HTMLInputElement;
    sharpsInput.value = text;
}

function setFlats(text: string) {
    let flatsInput = document.getElementById("flats-text") as HTMLInputElement;
    console.log(`We are trying to set flats: [${text}]`);
    flatsInput.value = text;
}

function getSharps() {
    let sharpsInput = document.getElementById("sharps-text") as HTMLInputElement;
    return sharpsInput.value.toLowerCase();
}

function getFlats() {
    let flatsInput = document.getElementById("flats-text") as HTMLInputElement;
    return flatsInput.value.toLowerCase();
}

function isFocusedInSharpsOrFlatsInput() {
    let flatsInput = document.getElementById("flats-text") as HTMLInputElement;
    if (flatsInput === document.activeElement) {
        return true;
    }
    let sharpsInput = document.getElementById("sharps-text") as HTMLInputElement;
    if (sharpsInput === document.activeElement) {
        return true;
    }

    return false;
}

let keyCodeToPianoKey = {
    90: 18, // z => D
    88: 20, // x => E
    67: 21, // c => F
    86: 23, // v => G
    66: 25, // b => A
    78: 27, // n => B
    77: 28, // m => C3
    188: 30, // , => D
    190: 32, // . => E
    191: 33, // / => F
    //
    65: 35, // a => G
    83: 37, // s => A
    68: 39, // d => B
    70: 40, // f => C4
    71: 42, // g => D
    72: 44, // h => E
    74: 45, // j => F
    75: 47, // k => G
    76: 49, // l => A
    186: 51, // ; => B in Chrome
    59: 51, // ; => B in Firefox
    222: 52, // ' => C5
    //
    81: 47, // q => G
    87: 49, // w => A
    69: 51, // e => B
    82: 52, // r => C5
    84: 54, // t => D
    89: 56, // y => E
    85: 57, // u => F
    73: 59, // i => G
    79: 61, // o => A
    80: 63, // p => B
    219: 64, // [ => C6
    221: 66, // ] => D
    220: 68, // \ => E
    //
    // 192: 57, // Removed the ` => F mapping, since the Mac w/ TouchBar needs to use this key for ESC
    49: 59, // 1 => G
    50: 61, // 2 => A
    51: 63, // 3 => B
    52: 64, // 4 => C6
    53: 66, // 5 => D
    54: 68, // 6 => E
    55: 69, // 7 => F
    56: 71, // 8 => G
    57: 73, // 9 => A
    48: 75, // 0 => B
    189: 76, // - => C7
    187: 78, // = => D
};

export default (function () {
    var $text, $sharps, $flats;
    var sharps = ""; // the string value of the $sharps input
    var flats = "";
    var noteGroups = [];
    var octaveOffset = 0;

    // piano key numbers % 12
    var blackKeys = [2, -1, 5, 7, -1, 10, 0]; // -1 is for the spaces where there are no black keys
    var whiteKeys = [1, 3, 4, 6, 8, 9, 11];
    var noteLabels = ["a", "b", "c", "d", "e", "f", "g"];

    // which character to type to get the corresponding white key
    var keyboardLabels = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "r", "t", "y", "u", "i", "o", "p", "4", "5", "6", "7", "8", "9", "0", "-", "="];

    let canvasRef: React.MutableRefObject<HTMLCanvasElement> = null;

    // 90:23, // z => G
    // 88:25, // x => A
    // 67:27, // c => B
    // 86:28, // v => C3
    // 66:30, // b => D
    // 78:32, // n => E
    // 77:33, // m => F
    // 188:35, // , => G
    // 190:37, // . => A
    // 191:39, // / => B

    // resets the key offset
    function resetOffset() {
        console.log("Reset Offsets");
        octaveOffset = 0;
    }

    function resetEverything() {
        console.log("Reset Everything!");
        octaveOffset = 0;
        noteGroups = [];
        saveAndShowData();
    }

    function deleteLastGroup() {
        noteGroups.pop();
        saveAndShowData();
    }

    function saveAndShowData() {
        console.log(noteGroups);
        var newText = noteGroups.join(" ");
        localStorage.text = newText;
        setTextArea(newText);
        drawPiano();
    }

    function mergeLastTwoGroups() {
        if (noteGroups.length >= 2) {
            var merged = noteGroups.pop() + "." + noteGroups.pop();

            let arr = merged.split("."); // Piano numbers are separated by a period. Turn it into an array of numbers.
            let set = new Set(arr); // Remove duplicates.
            arr = [...set].sort(); // Sort the list.
            noteGroups.push(arr.join("."));

            saveAndShowData();
        }
    }

    function drawWhiteKeys(c) {
        c.strokeStyle = "#000";
        c.lineWidth = 0.2;
        c.fillStyle = "#FFF";

        for (var k = 0; k < 52; k++) {
            c.fillRect(k * 20, 0, 20, 120);
            c.strokeRect(k * 20, 0, 20, 120);
        }

        c.fillStyle = "#FCC";
        c.fillRect(23 * 20, 0, 20, 120);
    }

    function drawBlackKeys(c) {
        c.fillStyle = "#323232";

        for (var octave = 0; octave < 7; octave++) {
            for (var key = 0; key < 7; key++) {
                if (key == 1 || key == 4) {
                    continue; // skip B# and E#
                }

                c.fillRect(12 + 20 * (key + octave * 7), 0, 16, 72);
            }
        }

        // highest black key
        c.fillRect(12 + 7 * 7 * 20, 0, 16, 72);
    }

    function drawMostRecentGroup(c) {
        var lastGroup = noteGroups.slice(-1); // array of the last item
        if (lastGroup.length == 0) {
            return;
        }

        var notes = lastGroup[0].split(".");
        for (var i in notes) {
            var n = notes[i];
            var remainder = n % 12;

            var octaveIndex = Math.floor((n - 1) / 12);

            c.beginPath();
            if (blackKeys.includes(remainder)) {
                // is it a black key?
                var blackKeyIndex = octaveIndex * 7 + blackKeys.indexOf(remainder);
                // black keys are 16px wide
                c.arc(blackKeyIndex * 20 + 20, 60, 6, 0, 2 * Math.PI, false);
            } else {
                // if white, we map it to one of the 52 white keys
                var whiteKeyIndex = octaveIndex * 7 + whiteKeys.indexOf(remainder);

                // white keys are 20px wide
                c.arc(whiteKeyIndex * 20 + 10, 96, 7, 0, 2 * Math.PI, false);
            }
            c.fillStyle = "#BB0";
            c.fill();
        }
    }

    function drawPiano() {
        const elem: HTMLCanvasElement = canvasRef.current;
        if (!elem.getContext) {
            return;
        }
        const c = elem.getContext("2d");
        if (!c) {
            return;
        }

        c.scale(2, 2); // Support retina displays by drawing @ 2x resolution.

        // clear the background
        c.fillStyle = "#444";
        c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawWhiteKeys(c);
        drawBlackKeys(c);
        drawKeyLabels(c);
        drawMostRecentGroup(c);

        c.setTransform(1, 0, 0, 1, 0, 0); // Undo the c.scale(2, 2). Reset the transform with the identity matrix.
    }

    function drawKeyLabels(c) {
        c.textAlign = "center";

        // draw the piano key numbers for the white keys
        // also draw the note name
        for (var k = 1; k <= 88; k++) {
            var remainder = k % 12;
            if (whiteKeys.includes(remainder)) {
                var octave = Math.floor(k / 12);
                var whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
                var whiteKeyIndex = octave * 7 + whiteKeyNoteIndex;
                var noteLabel = noteLabels[whiteKeyNoteIndex];
                if (noteLabel == "c") {
                    c.font = "bold 13px Tahoma"; // bold every C note.
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

        // draw the current character to press, under the correct key!
        var offset = (octaveOffset + 2) * 7 - 4; // start on D (key 18)
        var len = keyboardLabels.length;
        for (var i = 0; i < len; i++) {
            c.fillText(keyboardLabels[i], (i + offset) * 20 + 10, 140);
        }
    }

    function loadSharpsAndFlats() {
        if (!localStorage.sharps) {
            localStorage.sharps = "";
        }
        sharps = localStorage.sharps;
        setSharps(sharps);

        if (!localStorage.flats) {
            localStorage.flats = "";
        }
        flats = localStorage.flats;
        setFlats(flats);
    }

    function loadNoteGroups() {
        if (!localStorage.text) {
            localStorage.text = "";
        }

        var text = localStorage.text.trim();
        if (text == "") {
            noteGroups = [];
        } else {
            noteGroups = text.split(" ");
        }
        setTextArea(noteGroups.join(" "));
    }

    function play(keyCode, sharpModifier) {
        if (keyCodeToPianoKey.hasOwnProperty(keyCode)) {
            // get the name of the note we are about to play
            var remainder = keyCodeToPianoKey[keyCode] % 12;
            var whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
            var noteLabel = noteLabels[whiteKeyNoteIndex];

            // is this note auto-sharped, due to the key signature?
            if (sharps.indexOf(noteLabel) != -1) {
                sharpModifier++; // raise the sharp a half-step!
            }
            // is this note auto-flatted, due to the key signature?
            if (flats.indexOf(noteLabel) != -1) {
                sharpModifier--; // lower the note a half-step!
            }

            var pianoKeyNumber = keyCodeToPianoKey[keyCode] + sharpModifier + octaveOffset * 12;
            if (pianoKeyNumber < 1 || pianoKeyNumber > 88) {
                return;
            }

            noteGroups.push(pianoKeyNumber + ""); // push the string onto our array
            // const durationInSeconds = 0.4;
            const durationInSeconds = 0.7;
            const volume = 0.88;
            piano.play(pianoKeyNumber, durationInSeconds, volume);
            saveAndShowData();
        }
    }

    return {
        start: (cRef: React.MutableRefObject<HTMLCanvasElement>) => {
            canvasRef = cRef;
            loadNoteGroups();
            loadSharpsAndFlats();
            drawPiano();
        },

        keydown: (e) => {
            if (!piano) {
                piano = new Piano(PianoType.Sampled_2);
                piano.initWebAudio();
            }

            if (isFocusedInSharpsOrFlatsInput()) {
                return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
            }

            // CMD KEY on Mac
            if (e.keyCode == 91 || e.keyCode == 93) {
                selectTextArea();
            }

            if (e.metaKey) {
                // CMD + X or CMD + C
                if (e.keyCode == 88 || e.keyCode == 67) {
                    copyTextArea();
                    setTimeout(resetEverything, 10);
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
                case 32: // SPACE
                    console.log("DO NOTHING ON SPACE");
                    break;
                case 27: // ESC
                    if (e.shiftKey) {
                        resetEverything();
                    } else {
                        resetOffset();
                    }
                    break;
                case 192: // ~ == SHIFT + `
                    resetEverything();
                    break;
                case 8: // BACKSPACE/DEL
                    deleteLastGroup();
                    break;
                case 9: // TAB
                    mergeLastTwoGroups();
                    break;
                case 38: // UP an octave
                    octaveOffset++;
                    drawPiano();
                    break;
                case 40: // DOWN an octave
                    octaveOffset--;
                    drawPiano();
                    break;
                default:
                    play(e.keyCode, sharpModifier);
                    break;
            }
        },

        // update our sharps / flats
        keyup: (e) => {
            localStorage.sharps = getSharps();
            localStorage.flats = getFlats();
        },
    };
})();
