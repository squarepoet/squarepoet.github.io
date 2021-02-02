import PianoAuthorV2 from "apps/author/piano/v2/App";
import { useEffect, useRef } from "react";

let context2d = null;
let context2dWidth = 0;
let context2dHeight = 0;

const setupCanvas = (canvas: HTMLCanvasElement) => {
    canvas.width = 2080; // Retina Display Support
    canvas.height = 300; // Retina Display Support
    canvas.style.width = "1040px"; // Retina Display Support
    canvas.style.height = "150px"; // Retina Display Support
    context2dWidth = canvas.width;
    context2dHeight = canvas.height;
    context2d = canvas.getContext("2d");
    context2d.scale(2, 2); // Retina Display Support
};

let isMouseDown = false;
const whiteKeyOffsets = [1, 3, 4, 6, 8, 9, 11]; // A  B  C  D  E  F  G
const blackKeyOffsets = [2, 0, 5, 7, 0, 10, 12]; // A# _  C# D# _  F# G#
const BLACK_KEY_WIDTH = PianoAuthorV2.UI.BLACK_KEY_HEIGHT;
const BLACK_KEY_HEIGHT = PianoAuthorV2.UI.BLACK_KEY_HEIGHT;

function getPianoKeyNumberForMouseLocation(x, y): number {
    let octaveOffset = 0;
    if (y <= BLACK_KEY_HEIGHT) {
        // x: 12 + 20 * (key + (octave * 7))
        // y: 0
        // w: BLACK_KEY_WIDTH
        // h: BLACK_KEY_HEIGHT
        let temp = Math.floor((x - 12) / 20);
        octaveOffset = Math.floor(temp / 7);
        let blackKeyNumber = temp % 7;
        let xRelativeToKeyOrigin = (x - 12) % 20;

        if (
            xRelativeToKeyOrigin >= 0 &&
            xRelativeToKeyOrigin <= BLACK_KEY_WIDTH && // Make sure we're within the black key.
            blackKeyNumber !== 1 &&
            blackKeyNumber !== 4
        ) {
            // There are no black keys at B# and E#.

            let keyNumber = octaveOffset * 12 + blackKeyOffsets[blackKeyNumber];
            return keyNumber;
        }
    }

    // WHITE KEYS ONLY
    let whiteKeyNumber = Math.floor(x / 20);
    let remainder = whiteKeyNumber % 7;
    octaveOffset = Math.floor(whiteKeyNumber / 7);
    return octaveOffset * 12 + whiteKeyOffsets[remainder];
}

let mostRecentlyPlayedPianoKeyNumber = -1;

namespace MouseHandler {
    let x;
    let y;

    const updateMouseCoordinates = (e) => {
        console.log("OFFSET LEFT " + e.currentTarget.offsetLeft);
        console.log("OFFSET TOP " + e.currentTarget.offsetTop);
        var rect = e.currentTarget.getBoundingClientRect();
        x = Math.round(e.clientX - rect.left); // x position within the element.
        y = Math.round(e.clientY - rect.top); // y position within the element.
    };

    export const onMouseDown = (e) => {
        updateMouseCoordinates(e);
        isMouseDown = true;
        console.log("Mouse Down at " + x + " , " + y);

        const pianoKeyNumber = getPianoKeyNumberForMouseLocation(x, y);
        mostRecentlyPlayedPianoKeyNumber = pianoKeyNumber;
        PianoAuthorV2.playOneNote(pianoKeyNumber);
    };

    export const onMouseMove = (e) => {
        if (!isMouseDown) {
            return;
        }
        updateMouseCoordinates(e);

        console.log("Mouse Move at " + x + " , " + y);
        const pianoKeyNumber = getPianoKeyNumberForMouseLocation(x, y);
        if (pianoKeyNumber !== mostRecentlyPlayedPianoKeyNumber) {
            mostRecentlyPlayedPianoKeyNumber = pianoKeyNumber;
            PianoAuthorV2.playOneNote(pianoKeyNumber);
        }
    };

    export const onMouseUp = (e) => {
        isMouseDown = false;
        mostRecentlyPlayedPianoKeyNumber = -1;
        updateMouseCoordinates(e);
        console.log("Mouse Up at " + x + " , " + y);
    };

    export const onMouseLeave = (e) => {
        isMouseDown = false;
        mostRecentlyPlayedPianoKeyNumber = -1;
        updateMouseCoordinates(e);
        console.log("Mouse Leave at " + x + " , " + y);
    };
}

// Someone else will have to dispatch updates to tell us to redraw!
const PianoKeyboard = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        setupCanvas(canvasRef.current);
        PianoAuthorV2.UI.setCanvasContext(context2d, context2dWidth, context2dHeight);
        PianoAuthorV2.UI.drawPiano();
    }, []);

    return (
        <>
            <div>
                <canvas ref={canvasRef} width="1040" height="150" onMouseDown={MouseHandler.onMouseDown} onMouseMove={MouseHandler.onMouseMove} onMouseUp={MouseHandler.onMouseUp} onMouseLeave={MouseHandler.onMouseLeave}></canvas>
            </div>
            <style jsx>{`
                div {
                    margin: auto;
                    margin-top: 12px;
                    border: 1px solid #444;
                    width: 1040px;
                    height: 150px;
                }
                canvas {
                    cursor: pointer;
                    display: block;
                }
            `}</style>
        </>
    );
};
export default PianoKeyboard;
