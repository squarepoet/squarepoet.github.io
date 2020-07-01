import * as Tone from "tone";

let synth;

export default class Piano {
    constructor() {}

    initWebAudio() {
        console.log("Start Tone.js");
        if (!synth) {
            synth = new Tone.AMSynth().toDestination();
        }
    }

    play(pianoKeyNumber: number) {
        console.log("PLAY " + pianoKeyNumber);
        synth.triggerAttack("C4");
    }

    stop(pianoKeyNumber: number) {
        synth.triggerRelease();
    }
}
