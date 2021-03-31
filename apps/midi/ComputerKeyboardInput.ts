// Use computer keyboard input to play the piano.
// Pressing
// a s d f g h j k l ; ' => c d e f g a b c d e f
// w e | t y u | o p => c# d# | f# g# a# b# | c# d#
// We can connect an Instrument object to this handle the sound output.
// We can connect an object to receive MIDI events, or we can broadcast it as a midi device, perhaps?

import Instrument from "apps/shared/sound/Instrument";

namespace ComputerKeyboardInput {
    let octaveNumber = 4; // C4 is middle C.

    let soundOutput: Instrument = null; // MIDI events are sent to this destination, which will output sound.

    // key/value pair:
    // key: a computer key that is currently held down by the user.
    // value: the piano key that it corresponds to.
    // LOL @ the variable name! :-}
    const currentlyPressedKeyCodeToPianoKeyNumber = new Map<string, number>();

    let computerKeyToPianoKey = new Map([
        ["KeyA", -8], // C => pianoKey 40 is middle C
        ["KeyW", -7], //   C#/Db
        ["KeyS", -6], // D
        ["KeyE", -5], //   D#/Eb
        ["KeyD", -4], // E
        ["KeyF", -3], // F
        ["KeyT", -2], //   F# / Gb
        ["KeyG", -1], // G
        ["KeyY", 0], //   G# / Ab
        ["KeyH", 1], // A
        ["KeyU", 2], //   A#/Bb
        ["KeyJ", 3], // B
        ["KeyK", 4], // C
        ["KeyO", 5], //   C#/Db
        ["KeyL", 6], // D
        ["KeyP", 7], //   D#/Eb
        ["Semicolon", 8], // E
        ["Quote", 9], // F
    ]);

    export function moveOctaveDown() {
        octaveNumber--;
        if (octaveNumber < 0) {
            octaveNumber = 0;
        }
    }
    export function moveOctaveUp() {
        octaveNumber++;
        if (octaveNumber > 7) {
            octaveNumber = 7;
        }
    }

    export function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.altKey && e.shiftKey) {
            if (e.code == "ArrowLeft") {
                moveOctaveDown();
            } else if (e.code == "ArrowRight") {
                moveOctaveUp();
            }
            console.log("Octave is now: " + octaveNumber);
        } else if (e.ctrlKey || e.altKey || e.metaKey) {
            console.log("Ignoring input, because you might be interacting with your browser.");
            return;
        }

        if (!soundOutput || !soundOutput.isInitialized) {
            return;
        }
        const code = e.code;
        if (computerKeyToPianoKey.has(code) && !currentlyPressedKeyCodeToPianoKeyNumber.has(code)) {
            const pianoKeyNumber = computerKeyToPianoKey.get(code) + octaveNumber * 12;
            currentlyPressedKeyCodeToPianoKeyNumber.set(code, pianoKeyNumber);
            soundOutput.play(pianoKeyNumber, 0, 0.8 /* volume */);
        }
    }

    export function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!soundOutput || !soundOutput.isInitialized) {
            return;
        }
        const code = e.code;
        if (computerKeyToPianoKey.has(code)) {
            soundOutput.stop(currentlyPressedKeyCodeToPianoKeyNumber.get(code));
            currentlyPressedKeyCodeToPianoKeyNumber.delete(code);
        }
    }

    export function setSoundOutput(i: Instrument) {
        soundOutput = i;
    }

    export function reset() {
        if (soundOutput) {
            soundOutput = null;
        }
    }
}

export default ComputerKeyboardInput;
