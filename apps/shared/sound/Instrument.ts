import Musical from "apps/shared/sound/Musical";
import Preloader from "apps/shared/sound/Preloader";
import ToneInfo from "apps/shared/sound/ToneInfo";
import * as Tone from "tone";

// #TODO: Can we reimplement the Musical.js sound with Tone.js?
// See https://tonejs.github.io/docs/14.7.77/Oscillator.html

// A Typescript enum is just a two way mapping between index and the string representation.
enum InstrumentType {
    SynthBasic = 0, // Default PolySynth
    SynthFM,
    SynthAM,
    SynthFatSawtooth,
    SynthMusicalJS, // Musical.js by PencilCode
    Sampled_1,
    Sampled_2,
    SynthTest1, // For testing.
    SynthTest2, // For testing.
    SynthTest3, // For testing PluckSynth
    COUNT, // Old school! :-\
}

const validateInstrumentType = (inputValue: any): InstrumentType => {
    const instrumentTypeNumber = parseInt(inputValue);
    if (!isNaN(instrumentTypeNumber) && instrumentTypeNumber >= 0 && instrumentTypeNumber < InstrumentType.COUNT) {
        return instrumentTypeNumber as InstrumentType; // inputValue was VALID!
    } else {
        return InstrumentType.SynthBasic; // inputValue was NOT VALID, so we return the default InstrumentType.
    }
};

let numInstrumentsCreated = 0;

// We do this because Tone.Instrument is a private abstract class. It would be easier if it was a public interface that we could use.
// Mostly we stick with Tone.PolySynth and Tone.Sampler.
// For now, avoid Tone.PluckSynth because it sounds terrible.
// Only use Tone.Synth for testing, because it only supports one sound at a time.
interface ToneInstrument {
    triggerAttackRelease(note: Tone.Unit.Frequency, duration: Tone.Unit.Time, time?: Tone.Unit.Time, velocity?: Tone.Unit.NormalRange): this;
    triggerAttack(note: Tone.Unit.Frequency, time?: Tone.Unit.Time, velocity?: Tone.Unit.NormalRange): this;
    triggerRelease(...args: any[]): this;
    releaseAll?(time?: Tone.Unit.Time): this; // Tone.PolySynth and Tone.Sampler
    dispose(): this;
}

class Instrument {
    private id: number = 0;

    type: InstrumentType = InstrumentType.SynthBasic;

    // Several options for instrument timbre.
    toneJS_Instrument: ToneInstrument;

    musicalJS_Instrument: Musical.Instrument = null;

    private isReady: boolean = false;

    // For setting up Tone.Sampler
    private preloader: Preloader = null;
    private samplesMap: any;
    private baseURL: string = "";

    // Only call this from a user gesture, so we can start WebAudio!
    constructor(type: InstrumentType) {
        this.id = numInstrumentsCreated;
        numInstrumentsCreated++;
        console.log("Created Instrument ID: " + this.id);
        console.log("So far, we have created " + numInstrumentsCreated + " instruments.");

        this.type = type;
        if (this.type === InstrumentType.SynthMusicalJS) {
            console.log("Creating a Musical JS Instrument");
            this.musicalJS_Instrument = new Musical.Instrument("piano");
            this.isReady = true;
            this.play_Helper = this.play_HelperMusicalJS;
            this.stop = this.stop_doNothing; // Musical.js does not need a stop, since every tone has the same length.
            this.silence = this.silence_musicalJS;
        } else {
            console.log("Creating a Tone JS Instrument");
            if (!ToneInfo.isRunning) {
                Tone.start().then(() => {
                    console.log("Tone is Ready!");
                    ToneInfo.isRunning = true;
                });
            }

            switch (this.type) {
                case InstrumentType.SynthBasic:
                default:
                    this.setupBasicInstrument();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.Sampled_1:
                    this.setupSampledInstrument1();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.Sampled_2:
                    this.setupSampledInstrument2();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.SynthFM:
                    this.setupFMInstrument();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.SynthAM:
                    this.setupAMInstrument();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.SynthFatSawtooth:
                    this.setupFatSawtoothInstrument();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.SynthTest1:
                    this.setupTestInstrument1();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNoParams;
                    this.silence = this.silence_triggerRelease;
                    break;
                case InstrumentType.SynthTest2:
                    this.setupTestInstrument2();
                    this.play_Helper = this.play_HelperToneJS;
                    this.stop = this.stop_triggerReleaseNote;
                    this.silence = this.silence_releaseAll;
                    break;
                case InstrumentType.SynthTest3:
                    this.setupTestInstrument3();
                    this.play_Helper = this.play_HelperToneJS_PluckSynth;
                    this.stop = this.stop_triggerReleaseNoParams;
                    this.silence = this.silence_triggerRelease;
                    break;
            }
        }
    }

    public get isInitialized() {
        return this.isReady;
    }

    // velocity parameter ranges from [0 to 1.0]
    play(pianoKeyNumber: number, durationInSeconds: number = 0, velocity: number = 1.0) {
        if (velocity > 1) {
            velocity = 1;
        } else if (velocity < 0) {
            velocity = 0;
        }

        if (durationInSeconds < 0) {
            durationInSeconds = 0;
        }

        const durationInfo = durationInSeconds > 0 ? ` for ${durationInSeconds} seconds` : "";
        const velocityInfo = " at velocity = " + velocity;
        console.log("Instrument: PLAY " + pianoKeyNumber + durationInfo + velocityInfo);

        const midiNoteNumber = pianoKeyNumber + 20;

        this.play_Helper(midiNoteNumber, durationInSeconds, velocity);
    }

    private play_Helper: (midiNoteNumber: number, durationInSeconds: number, velocity: number) => void;

    private play_HelperMusicalJS(midiNoteNumber: number, durationInSeconds: number, velocity: number) {
        // Musical.js
        // tone(...) parameter is specified
        // as a positive integer in Hz
        //   OR
        // as a negative integer in MIDI note numbers
        //   MIDI number 60 == Middle C == pianoKeyNumber 40
        this.musicalJS_Instrument.tone(-midiNoteNumber);
    }

    private play_HelperToneJS(midiNoteNumber: Tone.Unit.MidiNote, durationInSeconds: number, velocity: number) {
        try {
            const hertz = Tone.mtof(midiNoteNumber);
            if (durationInSeconds > 0) {
                this.toneJS_Instrument.triggerAttackRelease(hertz, durationInSeconds, Tone.now(), velocity);
            } else {
                this.toneJS_Instrument.triggerAttack(hertz, Tone.now(), velocity);
            }
        } catch (e: any) {
            console.log(e); // Tone.js has asserts, which we sometimes trigger! :-(
        }
    }

    // Tone.PluckSynth currently has a different API from the rest of the Tone Instruments. :-(
    private play_HelperToneJS_PluckSynth(midiNoteNumber: Tone.Unit.MidiNote, durationInSeconds: number, velocity: number) {
        try {
            const hertz = Tone.mtof(midiNoteNumber);
            this.toneJS_Instrument.triggerAttack(hertz);
        } catch (e: any) {
            console.log(e); // Tone.js has asserts, which we sometimes trigger! :-(
            // Errors we have seen:
            //     Start time must be strictly greater than previous start time
        }
    }

    stop: (pianoKeyNumber: number) => void;

    private stop_doNothing(pianoKeyNumber: number /* ignored */) {
        // This function does nothing.
    }

    private stop_triggerReleaseNoParams(pianoKeyNumber: number /* ignored */) {
        this.toneJS_Instrument.triggerRelease();
    }

    private stop_triggerReleaseNote(pianoKeyNumber: number) {
        const midiNoteNumber = (pianoKeyNumber + 20) as Tone.Unit.MidiNote;
        const hertz = Tone.mtof(midiNoteNumber);
        this.toneJS_Instrument.triggerRelease(hertz);
    }

    // Stereo
    setupSampledInstrument1() {
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
        this.setupSampledInstrument({ attack: 0.01 });
        // this.isReady will be true after all the mp3 files load.
    }

    // Mono
    setupSampledInstrument2() {
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
        this.setupSampledInstrument({ attack: 0.05 });
        // this.isReady will be true after all the mp3 files load.
    }

    setupSampledInstrument(options: any) {
        this.isReady = false;

        // Get absolute URLs for mp3 sample files to preload.
        const filesToPreload = [];
        for (const keyName in this.samplesMap) {
            const fileName = this.samplesMap[keyName];
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
        this.toneJS_Instrument = new Tone.Sampler(config).toDestination();
    }

    setupBasicInstrument() {
        console.log("Basic");
        const synth = new Tone.PolySynth(Tone.Synth);
        synth.toDestination(); // Connect it to our computer speakers so we can hear the sound!
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    setupFMInstrument() {
        console.log("SynthFM");
        const synth = new Tone.PolySynth(Tone.FMSynth);
        synth.toDestination();
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    setupFatSawtoothInstrument() {
        console.log("SynthFatSawtooth");
        const synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "fatsawtooth",
                // type: "fatsine",
                // type: "fattriangle",
                // type: "fatsquare",
                count: 3, // how many simultaneous sine / sawtooth / etc waves to play?
                spread: 22 /* every 100 cents is a semitone. 400 cents is a major 3rd (in equal temperament). */,
            },
        });
        const reverb = new Tone.Reverb({
            preDelay: 0.1 /* seconds */,
            decay: 1 /* seconds */,
            wet: 0.55 /* the synth is 55% affected by reverb effect. */,
        });
        synth.chain(reverb, Tone.Destination);
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    setupAMInstrument() {
        console.log("SynthAM");
        const synth = new Tone.PolySynth(Tone.AMSynth);
        const reverb = new Tone.Reverb({
            preDelay: 0.1 /* seconds */,
            decay: 1 /* seconds */,
            wet: 0.55 /* the synth is 55% affected by reverb effect. */,
        });
        const volume = new Tone.Volume(8);
        synth.chain(reverb, volume, Tone.Destination);
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    setupTestInstrument1() {
        console.log("Test 1: MetalSynth");
        const synth = new Tone.PolySynth(Tone.MetalSynth);
        const reverb = new Tone.Reverb({
            preDelay: 0.1 /* seconds */,
            decay: 0.8 /* seconds */,
            wet: 0.66 /* the synth is 66% affected by reverb effect. */,
        });
        const volume = new Tone.Volume(-10);
        synth.chain(reverb, volume, Tone.Destination); // Connect it to our computer speakers so we can hear the sound!
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    setupTestInstrument2() {
        console.log("Test 2: MonoSynth");
        const synth = new Tone.PolySynth(Tone.MonoSynth);
        synth.toDestination(); // Connect it to our computer speakers so we can hear the sound!
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    // I'm not sure how to make it sound more like a guitar.
    setupTestInstrument3() {
        console.log("Test 2: PluckSynth");
        const synth = new Tone.PluckSynth({
            attackNoise: 0.2,
            dampening: 2000,
            resonance: 0.982,
            release: 1,
        });
        const reverb = new Tone.Reverb({
            preDelay: 0.1 /* seconds */,
            decay: 2 /* seconds */,
            wet: 0.75 /* the synth is 75% affected by reverb effect. */,
        });
        synth.chain(reverb, Tone.Destination);
        this.toneJS_Instrument = synth;
        this.isReady = true;
    }

    silence: () => void;

    private silence_releaseAll() {
        this.toneJS_Instrument.releaseAll();
    }

    private silence_triggerRelease() {
        this.toneJS_Instrument.triggerRelease();
    }

    private silence_musicalJS() {
        this.musicalJS_Instrument.silence();
    }

    dispose() {
        console.log("Disposing of Instrument ID: " + this.id);

        this.preloader = null;
        if (this.toneJS_Instrument) {
            this.toneJS_Instrument.dispose();
            this.toneJS_Instrument = null;
        }
        if (this.musicalJS_Instrument) {
            this.musicalJS_Instrument = null;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export { InstrumentType, validateInstrumentType };

export default Instrument;
