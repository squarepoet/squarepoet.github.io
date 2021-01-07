import Preloader from "apps/shared/sound/Preloader";
import * as Tone from "tone";

enum PianoType {
    Basic,
    FM,
    AM,
    Sampled_1,
    Sampled_2,
}

export default class Piano {
    type: PianoType;
    instrument: Tone.PolySynth | Tone.Synth | Tone.FMSynth | Tone.AMSynth | Tone.Sampler = null; // Tone.Instrument
    preloader: Preloader = null;

    constructor(pianoType?: PianoType) {
        if (typeof pianoType === "undefined") {
            pianoType = PianoType.Basic;
        }
        this.type = pianoType;
    }

    initWebAudio() {
        console.log("Start Tone.js");
        Tone.start().then(() => {
            console.log("Tone is Ready!");
        });

        let baseURL = "";
        let samplesMap;

        if (!this.instrument) {
            switch (this.type) {
                case PianoType.Sampled_1:
                    if (!this.preloader) {
                        this.preloader = new Preloader([
                            "/s/m/grand/4.mp3",
                            "/s/m/grand/16.mp3",
                            "/s/m/grand/28.mp3",
                            "/s/m/grand/30.mp3",
                            "/s/m/grand/32.mp3",
                            "/s/m/grand/35.mp3",
                            "/s/m/grand/37.mp3",
                            "/s/m/grand/39.mp3",
                            "/s/m/grand/40.mp3",
                            "/s/m/grand/42.mp3",
                            "/s/m/grand/44.mp3",
                            "/s/m/grand/45.mp3",
                            "/s/m/grand/47.mp3",
                            "/s/m/grand/49.mp3",
                            "/s/m/grand/52.mp3",
                            "/s/m/grand/57.mp3",
                            "/s/m/grand/61.mp3",
                            "/s/m/grand/64.mp3",
                            "/s/m/grand/69.mp3",
                            "/s/m/grand/76.mp3",
                            "/s/m/grand/83.mp3",
                            "/s/m/grand/88.mp3",
                        ]);
                    }
                    baseURL = "/s/m/grand/";
                    samplesMap = {
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
                    this.setupSamplerInstrument(baseURL, samplesMap);
                    break;
                case PianoType.Sampled_2:
                    if (!this.preloader) {
                        this.preloader = new Preloader([
                            "/s/m/bright/4.mp3",
                            "/s/m/bright/11.mp3",
                            "/s/m/bright/16.mp3",
                            "/s/m/bright/23.mp3",
                            "/s/m/bright/28.mp3",
                            "/s/m/bright/35.mp3",
                            "/s/m/bright/40.mp3",
                            "/s/m/bright/47.mp3",
                            "/s/m/bright/52.mp3",
                            "/s/m/bright/59.mp3",
                            "/s/m/bright/64.mp3",
                            "/s/m/bright/71.mp3",
                            "/s/m/bright/76.mp3",
                            "/s/m/bright/83.mp3",
                            "/s/m/bright/88.mp3",
                        ]);
                    }
                    baseURL = "/s/m/bright/";
                    samplesMap = {
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
                    this.setupSamplerInstrument(baseURL, samplesMap);
                    break;
                case PianoType.FM:
                    this.instrument = new Tone.PolySynth(Tone.FMSynth).toDestination();
                    break;
                case PianoType.AM:
                    this.instrument = new Tone.PolySynth(Tone.AMSynth).toDestination();
                    break;
                default:
                    this.instrument = new Tone.PolySynth(Tone.Synth).toDestination();
                    break;
            }
        }
    }

    setupSamplerInstrument(baseURL: string, samplesMap: any) {
        const config: any = {
            release: 1,
            baseUrl: baseURL,
            onload: function (buffers: any) {
                console.log("Audio Buffers Loaded!");
                console.log(buffers);
            },
        };

        this.instrument = new Tone.Sampler(samplesMap, config).toDestination();
    }

    get isInitialized(): boolean {
        return this.instrument !== null;
    }

    play(pianoKeyNumber: number, durationInSeconds: number = 0, velocity: number = 1.0) {
        let noteName = Tone.Frequency(pianoKeyNumber + 20, "midi").toNote();
        console.log("Play " + pianoKeyNumber + " <=> " + noteName);

        if (durationInSeconds <= 0) {
            this.instrument.triggerAttack(noteName, 0, velocity);
        } else {
            // this.instrument.triggerAttackRelease(noteName, "4n");
            this.instrument.triggerAttackRelease(noteName, durationInSeconds);
            // this.instrument.triggerAttackRelease(noteName, durationInSeconds, 0 /* time from now */, velocity);
        }
    }

    stop(pianoKeyNumber: number) {
        let noteName = Tone.Frequency(pianoKeyNumber + 20, "midi").toNote();
        console.log("TRIGGER RELEASE " + pianoKeyNumber + " / " + noteName);
        this.instrument.triggerRelease(noteName);
    }

    stopAllNotes() {
        console.log(this.type);
        if (this.type === PianoType.Sampled_1 || this.type === PianoType.Sampled_2) {
            console.log("stopAllNotes!");
            (this.instrument as Tone.Sampler).releaseAll(Tone.now());
        } else {
            console.log("NOT IMPLEMENTED FOR SYNTHS: TRIGGER RELEASE ALL");
        }
    }
}

// See also view-source:https://tonejs.github.io/examples/sampler.html
// Do they use really long files? 16 seconds, in fact! How do I affect the attack and release?

// class Instrument {
//     play(pianoKeyNumber: number) {
//         const twelfth_root_of_2 = 1.0594630943592953;
//         const hertz = 440 * Math.pow(twelfth_root_of_2, pianoKeyNumber - 49);
//         this.synth.volume.value = -10; // TODO: Figure out a good volume curve. EQ! :-)
//         // +16 for key 1
//         // -20 for key 88
//         this.synth.triggerAttackRelease(hertz, 0.4);
//     }
// }

export { PianoType };
