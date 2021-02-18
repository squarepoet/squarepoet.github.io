import { Draw } from "tone";

namespace FretCanvas {
    const FRET_DX = 85;
    const NOTE_LABELS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    export function draw(elem: HTMLCanvasElement, numStrings: number) {
        if (!elem || !elem.getContext) {
            return;
        }
        const c = elem.getContext("2d");
        if (!c) {
            return;
        }

        const width = elem.width;
        const height = elem.height;

        // Clear the background.
        c.fillStyle = "#131313";
        c.fillRect(0, 0, width, height);

        drawStringsAndFrets(c, width, height, numStrings);
        drawKeyLabels(c, numStrings);
    }

    function drawStringsAndFrets(c: CanvasRenderingContext2D, width: number, height: number, numStrings: number) {
        // 0th fret
        c.fillStyle = "rgba(255,255,255,0.1)";
        c.fillRect(0, 0, 30, height);

        c.lineWidth = 1;

        // 6 strings. Horizontal lines.
        for (let s = 1; s <= numStrings; s++) {
            c.beginPath();
            const opacity = 0.1 * s;
            c.strokeStyle = `rgba(255,255,255,${opacity})`;
            c.moveTo(0, s * 40);
            c.lineTo(width, s * 40);
            c.stroke();
        }

        // Fret Lines
        c.beginPath();
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255,255,255,0.5)";

        const FRET_OFFSET = 20;

        // 11 vertical lines (handling frets 0 => 12)
        for (let f = 1; f <= 11; f++) {
            let x = f * FRET_DX + FRET_OFFSET;
            c.beginPath();
            c.moveTo(x, 0);
            c.lineTo(x, 280);
            c.stroke();
        }
    }

    let noteOffsetForString = [0, 7, 2, 10, 5, 0, 7]; // [X] E B G D A E
    // which character to type to get the corresponding note
    let keyboardLabels = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ];

    // XXX CUSTOMIZE THIS
    let fretOffset = 0;
    let stringOffset = 0;

    function drawKeyLabels(c, numStrings: number) {
        c.font = "14px Tahoma";
        c.lineJoin = "round";
        c.lineWidth = 6;

        // draw the note name
        for (let s = 1; s <= numStrings; s++) {
            for (let f = 0; f <= 12; f++) {
                let localFretOffset = f == 0 ? 10 : 15 - FRET_DX / 2;
                let noteOffset = noteOffsetForString[s];
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
                let keyLabel = keyboardLabels[s - 1][f];
                let adjustedFret = f + fretOffset;
                let localFretOffset = adjustedFret == 0 ? 10 : 15 - FRET_DX * 0.5;
                let x = adjustedFret * FRET_DX + localFretOffset;
                let y = (s + stringOffset) * 40 + 22;
                c.fillText(keyLabel, x, y);
            }
        }
    }
}

export default FretCanvas;
