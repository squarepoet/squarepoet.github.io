import Constants from "apps/shared/Constants";
import { Draw } from "tone";

type FretCanvasInfo = {
    context2d: any;
    width: number;
    height: number;
};

namespace FretCanvas {
    const FRET_DX = 85;
    const SF = "♯♭"; // SF == SHARPS_FLATS
    const NOTE_LABELS = ["A", SF, "B", "C", SF, "D", SF, "E", "F", SF, "G", SF];

    export function getContext(elem: HTMLCanvasElement): FretCanvasInfo {
        if (!elem || !elem.getContext) {
            return null;
        }
        const c = elem.getContext("2d");
        if (c) {
            const width = elem.width;
            const height = elem.height;
            return { context2d: c, width: width, height: height };
        } else {
            return null;
        }
    }

    export function drawStringsAndFrets(c: CanvasRenderingContext2D, width: number, height: number, numStrings: number) {
        // Clear the background.
        c.fillStyle = "#131313";
        c.fillRect(0, 0, width, height);

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

    // Which computer character to type to get the corresponding music note.
    const computerKeyboardLabels = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ];

    export function drawNoteLabels(c: CanvasRenderingContext2D, instrumentType: string, numStrings: number) {
        // Set up indexes into the NOTE_LABELS array.
        // Pull out the note labels to display on the frets.
        let noteOffsetForString = null;
        switch (instrumentType) {
            case Constants.Instrument.GUITAR:
            default:
                noteOffsetForString = [0, 7, 2, 10, 5, 0, 7]; // [X] E B G D A E
                break;
            case Constants.Instrument.UKULELE_HIGH_G:
                noteOffsetForString = [0, 0, 7, 3, 10]; // [X] A E C High-G
                break;
            case Constants.Instrument.UKULELE_LOW_G:
                noteOffsetForString = [0, 0, 7, 3, 10]; // [X] A E C Low-G
                break;
        }

        c.font = "14px Tahoma";
        // c.lineJoin = "round";
        // c.lineWidth = 6;
        c.textAlign = "center";

        // Draw the note name
        for (let s = 1; s <= numStrings; s++) {
            for (let f = 0; f <= 12; f++) {
                const isFretZero = f === 0;
                const localFretOffset = isFretZero ? 15 : 20 - FRET_DX / 2;
                const noteOffset = noteOffsetForString[s];
                const noteLabel = NOTE_LABELS[(noteOffset + f) % 12];
                if (noteLabel === "C") {
                    c.fillStyle = "#F55";
                } else if (noteLabel === SF) {
                    c.fillStyle = "#525252";
                } else {
                    c.fillStyle = "#FFF";
                }
                const x = f * FRET_DX + localFretOffset;
                const y = s * 40 + 5;

                c.shadowOffsetX = 0;
                c.shadowOffsetY = 0;
                c.shadowColor = "rgba(0,0,0,1.0)";
                c.shadowBlur = 6;
                c.fillText(noteLabel, x, y);
            }
        }
    }

    export function drawComputerKeyboardLabels(c: CanvasRenderingContext2D, numStrings: number, fretOffset, stringOffset) {
        // draw the keyboard labels
        c.font = "11px Hack, Consolas, Courier";
        c.fillStyle = "rgba(0,255,255,0.75)";
        c.textAlign = "center";
        for (let s = 1; s <= 4; s++) {
            for (let f = 0; f < 10; f++) {
                const label = computerKeyboardLabels[s - 1][f];
                const adjustedFret = f + fretOffset;
                const isFretZero = adjustedFret === 0;
                const localFretOffset = isFretZero ? 15 : 20 - FRET_DX * 0.5;
                const x = adjustedFret * FRET_DX + localFretOffset;
                const y = (s + stringOffset) * 40 + 22;
                c.fillText(label, x, y);
            }
        }
    }

    export function drawNoteGroup(c) {
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
}

export default FretCanvas;
