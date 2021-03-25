import Musical from "apps/shared/sound/Musical";
import Preloader from "apps/shared/sound/Preloader";
import ToneInfo from "apps/shared/sound/ToneInfo";
import * as Tone from "tone";

// #TODO: Can we reimplement the Musical.js sound with Tone.js?
// See https://tonejs.github.io/docs/14.7.77/Oscillator.html

enum InstrumentType {
    SynthBasic,
    SynthFM,
    SynthAM,
    SynthMusicalJS, // Musical.js by PencilCode
    Sampled_1,
    Sampled_2,
}

class Instrument {
    type: InstrumentType = InstrumentType.SynthBasic;

    toneJSInstrument: Tone.PolySynth | Tone.Sampler = null;
    musicalJSInstrument: Musical.Instrument = null;

    private isReady: boolean = false;

    // For setting up Tone.Sampler
    private preloader: Preloader = null;
    private samplesMap: any;
    private baseURL: string = "";

    // Only call this from a user gesture, so we can start WebAudio!
    constructor(type: InstrumentType) {
        this.type = type;
        if (this.type === InstrumentType.SynthMusicalJS) {
            console.log("Creating a Musical JS Instrument");
            this.musicalJSInstrument = new Musical.Instrument("piano");
            this.isReady = true;
        } else {
            console.log("Creating a Tone JS Instrument");
            if (!ToneInfo.isRunning) {
                Tone.start().then(() => {
                    console.log("Tone is Ready!");
                    ToneInfo.isRunning = true;
                });
            }
            switch (this.type) {
                case InstrumentType.Sampled_1:
                    // Stereo
                    this.baseURL = "/s/m/grand/";
                    this.samplesMap = {
                        C1: "4.mp3",
                        C2: "16.mp3",
                        C3: "28.mp3",
                        D3: "30.mp3",
                        E3: "32.mp3",
                        G3: "35.mp3",
                        A3: "37.mp3",
                        B3: "39.mp3",
                        C4: "40.mp3",
                        D4: "42.mp3",
                        E4: "44.mp3",
                        F4: "45.mp3",
                        G4: "47.mp3",
                        A4: "49.mp3",
                        C5: "52.mp3",
                        F5: "57.mp3",
                        A5: "61.mp3",
                        C6: "64.mp3",
                        F6: "69.mp3",
                        C7: "76.mp3",
                        G7: "83.mp3",
                        C8: "88.mp3",
                    };
                    this.setupSamplerInstrument({ attack: 0.01 });
                    // this.isReady will be true after all the mp3 files load.
                    break;
                case InstrumentType.Sampled_2:
                    // Mono
                    this.baseURL = "/s/m/bright/";
                    this.samplesMap = {
                        C1: "4.mp3",
                        G1: "11.mp3",
                        C2: "16.mp3",
                        G2: "23.mp3",
                        C3: "28.mp3",
                        G3: "35.mp3",
                        C4: "40.mp3",
                        G4: "47.mp3",
                        C5: "52.mp3",
                        G5: "59.mp3",
                        C6: "64.mp3",
                        G6: "71.mp3",
                        C7: "76.mp3",
                        G7: "83.mp3",
                        C8: "88.mp3",
                    };
                    this.setupSamplerInstrument({ attack: 0.05 });

                    // this.isReady will be true after all the mp3 files load.
                    break;
                case InstrumentType.SynthFM:
                    this.toneJSInstrument = new Tone.PolySynth(Tone.FMSynth).toDestination();
                    this.isReady = true;
                    break;
                case InstrumentType.SynthAM:
                    this.toneJSInstrument = new Tone.PolySynth(Tone.AMSynth).toDestination();
                    this.isReady = true;
                    break;
                case InstrumentType.SynthBasic:
                default:
                    // Basic
                    this.toneJSInstrument = new Tone.PolySynth(Tone.Synth).toDestination();
                    this.isReady = true;
                    break;
            }
        }
    }

    public get isInitialized() {
        return this.isReady;
    }

    play(pianoKeyNumber: number, durationInSeconds: number = 0, velocity: number = 1.0) {
        const durationInfo = durationInSeconds > 0 ? ` for ${durationInSeconds} seconds` : "";
        const velocityInfo = " at velocity = " + velocity;
        console.log("PLAY " + pianoKeyNumber + durationInfo + velocityInfo);

        const midiNoteNumber = pianoKeyNumber + 20;

        if (this.toneJSInstrument) {
            const noteName = Tone.Frequency(midiNoteNumber, "midi").toNote();

            if (durationInSeconds > 0) {
                this.toneJSInstrument.triggerAttackRelease(noteName, durationInSeconds, Tone.now(), velocity);
            } else {
                this.toneJSInstrument.triggerAttack(noteName, Tone.now(), velocity);
            }
        } else {
            // Musical.js
            // tone(...) parameter is specified
            // as a positive integer in Hz
            //   OR
            // as a negative integer in MIDI note numbers
            //   MIDI number 60 == Middle C == pianoKeyNumber 40
            this.musicalJSInstrument.tone(-midiNoteNumber);
        }
    }

    stop(pianoKeyNumber: number) {
        console.log("STOP " + pianoKeyNumber);
        if (this.toneJSInstrument) {
            const midiNoteNumber = pianoKeyNumber + 20;
            const noteName = Tone.Frequency(midiNoteNumber, "midi").toNote();
            this.toneJSInstrument.triggerRelease(noteName);
        } else {
            // Musical.js
            console.log("STOP is NOT IMPLEMENTED FOR MUSICAL.JS");
        }
    }

    setupSamplerInstrument(options: any) {
        this.isReady = false;

        // Get absolute URLs for mp3 sample files to preload.
        const filesToPreload = [];
        for (const keyName in this.samplesMap) {
            const fileName = this.samplesMap[keyName];
            console.log(this.baseURL + fileName);
            filesToPreload.push(this.baseURL + fileName);
        }

        // Preload the files now.
        this.preloader = new Preloader(filesToPreload);

        // Create a Tone.Sampler instrument
        const config: any = {
            urls: this.samplesMap,
            baseUrl: this.baseURL,
            attack: options.attack, // determines how quickly the note comes in (the attack part of the ADSR envelope)
            release: 0.8, // determines how quickly the note falls off (the release part of the ADSR envelope)
            curve: "exponential", // exponential | linear
            onload: () => {
                this.isReady = true;
            },
        };
        this.toneJSInstrument = new Tone.Sampler(config).toDestination();
    }

    dispose() {
        console.log("DISPOSE");
        this.preloader = null;
        if (this.toneJSInstrument) {
            this.toneJSInstrument.dispose();
            this.toneJSInstrument = null;
        }
        if (this.musicalJSInstrument) {
            this.musicalJSInstrument = null;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export { InstrumentType };

export default Instrument;
