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
    instrument: Tone.Synth | Tone.FMSynth | Tone.AMSynth | Tone.Sampler = null; // Tone.Instrument

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

        if (!this.instrument) {
            switch (this.type) {
                case PianoType.Sampled_1:
                case PianoType.Sampled_2:
                    const config: any = {
                        release: 1,
                        baseUrl: "/s/m/grand/",
                        onload: function (buffers: any) {
                            console.log("ONLOAD");
                            console.log(buffers);
                        },
                    };

                    this.instrument = new Tone.Sampler(
                        {
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
                        },
                        config
                    ).toDestination();
                    break;
                case PianoType.FM:
                    this.instrument = new Tone.FMSynth().toDestination();
                    break;
                case PianoType.AM:
                    this.instrument = new Tone.AMSynth().toDestination();
                    break;
                default:
                    this.instrument = new Tone.Synth().toDestination();
                    break;
            }
        }
    }

    get isInitialized(): boolean {
        return this.instrument !== null;
    }

    // TODO: Support number[] for playing chords!
    play(pianoKeyNumber: number, durationInSeconds: number = 0, velocity: number = 1.0) {
        console.log("PLAY " + pianoKeyNumber);
        let noteName = Tone.Frequency(pianoKeyNumber + 20, "midi").toNote();
        console.log("Play " + pianoKeyNumber + " <=> " + noteName);

        if (durationInSeconds <= 0) {
            this.instrument.triggerAttack(noteName, 0, velocity);
        } else {
            this.instrument.triggerAttackRelease(noteName, durationInSeconds, "+0", velocity);
        }
    }

    stop(pianoKeyNumber: number) {
        this.instrument.triggerRelease(0);
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
