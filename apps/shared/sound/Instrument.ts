import Musical from "apps/shared/sound/Musical";
import Preloader from "apps/shared/sound/Preloader";
import * as Tone from "tone";

enum InstrumentType {
    Basic,
    FM, // Electric Organ?
    AM,
    Sampled_1,
    Sampled_2,
    Electric_1, // Musical.js
}

enum AudioSDKType {
    Tone,
    Musical,
}

type ToneJS_Instrument = Tone.PolySynth | Tone.Synth | Tone.FMSynth | Tone.AMSynth | Tone.Sampler;
type MusicalJS_Instrument = Musical.Instrument;

class Instrument {
    sdk: AudioSDKType;
    type: InstrumentType = InstrumentType.Basic;
    instrument: ToneJS_Instrument | MusicalJS_Instrument = null;
    private isReady: boolean = false;

    // For setting up Tone.Sampler
    private preloader: Preloader = null;
    private samplesMap: any;
    private baseURL: string = "";

    // Only call this from a user gesture, so we can call this.initWebAudio()!
    constructor(type: InstrumentType) {
        console.log("NEW INSTRUMENT");
        this.type = type;
        this.initWebAudio();
    }

    private initWebAudio() {
        if (!this.instrument) {
            if (this.type === InstrumentType.Electric_1) {
                this.sdk = AudioSDKType.Musical;
                console.log("Start Musical.js");
                this.instrument = new Musical.Instrument("piano");
                this.isReady = true;
            } else {
                this.sdk = AudioSDKType.Tone;
                console.log("Start Tone.js");
                Tone.start().then(() => {
                    console.log("Tone is Ready!");
                });
                switch (this.type) {
                    case InstrumentType.Sampled_1:
                        this.setupPreloaderAndSamplesMap_1();
                        // this.isReady will be true after all the mp3 files load.
                        break;
                    case InstrumentType.Sampled_2:
                        this.setupPreloaderAndSamplesMap_2();
                        // this.isReady will be true after all the mp3 files load.
                        break;
                    case InstrumentType.FM:
                        this.instrument = new Tone.PolySynth(Tone.FMSynth).toDestination();
                        this.isReady = true;
                        break;
                    case InstrumentType.AM:
                        this.instrument = new Tone.PolySynth(Tone.AMSynth).toDestination();
                        this.isReady = true;
                        break;
                    default:
                        this.instrument = new Tone.PolySynth(Tone.Synth).toDestination();
                        this.isReady = true;
                        break;
                }
            }
        }
    }

    get isInitialized(): boolean {
        return this.instrument !== null && this.isReady;
    }

    play(pianoKeyNumber: number, durationInSeconds: number = 0, velocity: number = 1.0) {
        if (this.sdk === AudioSDKType.Tone) {
            // Tone.js
            const noteName = Tone.Frequency(pianoKeyNumber + 20, "midi").toNote();
            console.log("Play " + pianoKeyNumber + " <=> " + noteName);

            if (durationInSeconds <= 0) {
                (this.instrument as ToneJS_Instrument).triggerAttack(noteName, 0, velocity);
            } else {
                // this.instrument.triggerAttackRelease(noteName, "4n");
                (this.instrument as ToneJS_Instrument).triggerAttackRelease(noteName, durationInSeconds);
                // this.instrument.triggerAttackRelease(noteName, durationInSeconds, 0 /* time from now */, velocity);
            }
        } else {
            // Musical.js
            // numerically (in Hz), or with midi numbers (as negative integers).
            (this.instrument as MusicalJS_Instrument).tone(-(pianoKeyNumber + 20)); // Musical.js accepts negative MIDI numbers 60 == Middle C (pianoKeyNumber === 40)
        }
    }

    stop(pianoKeyNumber: number) {
        if (this.sdk === AudioSDKType.Tone) {
            const noteName = Tone.Frequency(pianoKeyNumber + 20, "midi").toNote();
            console.log("TRIGGER RELEASE " + pianoKeyNumber + " / " + noteName);
            (this.instrument as ToneJS_Instrument).triggerRelease(noteName);
        } else {
            // Musical.js
            console.log("stop is NOT IMPLEMENTED FOR MUSICAL.JS");
        }
    }

    stopAllNotes() {
        console.log(this.type);
        if (this.sdk === AudioSDKType.Tone) {
            if (this.type === InstrumentType.Sampled_1 || this.type === InstrumentType.Sampled_2) {
                console.log("stopAllNotes!");
                (this.instrument as Tone.Sampler).releaseAll(Tone.now());
            } else {
                console.log("stopAllNotes is NOT IMPLEMENTED FOR SYNTHS.");
            }
        } else {
            // Musical.js
            console.log("stopAllNotes is NOT IMPLEMENTED FOR MUSICAL.JS");
        }
    }

    // Sampled_1: Punchy Attack
    setupPreloaderAndSamplesMap_1() {
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
        this.setupSamplerInstrument();
    }

    // Sampled_2: Softer/Smoother
    setupPreloaderAndSamplesMap_2() {
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
        this.setupSamplerInstrument();
    }

    setupSamplerInstrument() {
        // Get absolute URLs for mp3 sample files to preload.
        const filesToPreload = [];
        for (const keyName in this.samplesMap) {
            const fileName = this.samplesMap[keyName];
            console.log(this.baseURL + fileName);
            filesToPreload.push(this.baseURL + fileName);
        }
        // Preload the files now.
        if (!this.preloader) {
            this.preloader = new Preloader(filesToPreload);
        }
        // Create a Tone.Sampler instrument
        const config: any = {
            release: 1,
            baseUrl: this.baseURL,
            onload: (buffers: any) => {
                // Files successfully preloaded.
                this.isReady = true;
            },
        };
        this.instrument = new Tone.Sampler(this.samplesMap, config).toDestination();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export { InstrumentType as PianoType };

export default Instrument;
