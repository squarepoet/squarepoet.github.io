import Constants from "apps/shared/Constants";
import LUMIKeys from "apps/shared/midi/LUMIKeys";
import Instrument, { InstrumentType } from "apps/shared/sound/Instrument";
import WebMidi, { Input, Output } from "webmidi";

//
//
// Manufacturers:
//   Snoize / MIDI Monitor (Untitled XX)
namespace MIDIControllerIO {
    let inputs: Input[] = [];
    let outputs: Output[] = [];

    let soundOutput: Instrument = null;
    let logOutput: (msg: string) => void = null;
    let deviceListOutput: (deviceList: string) => void = null;

    export function start(instrumentType: string) {
        setInstrument(instrumentType);

        WebMidi.enable(function (err) {
            if (err) {
                console.log("WebMidi could not be enabled.", err);
                return;
            }
            console.log("WebMidi enabled!");

            setVariablesForDebugging();
            printOutAllInputsAndOutputs();

            const inputDeviceInfo = [];
            for (const i of WebMidi.inputs) {
                inputs.push(i);
                let inputName = "  " + i.name;
                if (i.manufacturer !== "") {
                    inputName += "    " + i.manufacturer;
                }
                inputDeviceInfo.push(inputName);

                i.addListener("noteon", "all", function (e) {
                    playMIDINote(e.note.number, e.rawVelocity);
                    logOutput("Note On: " + e.note.number + "  Velocity: " + e.rawVelocity);
                });
                i.addListener("noteoff", "all", function (e) {
                    stopMIDINote(e.note.number, e.rawVelocity);
                    logOutput("Note Off: " + e.note.number + "  Velocity: " + e.rawVelocity);
                });
            }

            const outputDeviceInfo = [];
            for (const o of WebMidi.outputs) {
                outputs.push(o);
                let outputName = "  " + o.name;
                if (o.manufacturer !== "") {
                    outputName += "    " + o.manufacturer;
                }
                outputDeviceInfo.push(outputName);
            }

            const deviceListInfo = ["Connected Devices", "", "Inputs:", ...inputDeviceInfo, "", "Outputs:", ...outputDeviceInfo];
            deviceListOutput(deviceListInfo.join("\n"));

            LUMIKeys.connect();

            // output = WebMidi.outputs[0];
            // output = WebMidi.getOutputById("1584982307");
            // output = WebMidi.getOutputByName("LUMI Keys Block KJ7T Bluetooth");
            // LUMI Keys Block KJ7T Bluetooth id: 1054130867
            // Xkey Air 37 BLE Bluetooth id: -1021446226
            // output = WebMidi.getOutputById("1054130867");

            // LUMI Keys Block KJ7T Bluetooth id: -899739147
            // Xkey Air 37 BLE Bluetooth id: 1748751320
            // input = WebMidi.getInputByName("LUMI Keys Block KJ7T Bluetooth");

            // if (!input) {
            //     console.log("Input is: " + input);
            //     console.log("Cannot Find LUMI Keys");
            //     return;
            // }

            // input.addListener("sysex", "all", function (e) {
            //     console.log("SYSEX");
            //     console.log(e);
            //     const dataString = new TextDecoder("utf-8").decode(e.data);
            //     console.log("SYSEX DATA STRING:");
            //     console.log(dataString);
            // });

            // input.addListener("controlchange", "all", function (e) {
            //     console.log(e);
            // });

            // m.getOutputById(-2075141395) MIDI Monitor by Snoize
            // o.playNote("C3")
            // o.stopNote("C3")

            // WebMidi.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240

            // Manufacturer IDs (Hexadecimal)
            // CME XKey Air 00 20 63
            // ROLI         00 21 10

            /*
            f000 2110 7707 0103 0063 f7
            ???

            f000 2110 7707 1010 4f00 0000 0000 45f7
            F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7

            f000 2110 7707 1010 6f00 0000 0000 25f7
            */
        }, true /* SYSEX ENABLED */);
    }

    function setVariablesForDebugging() {
        window["wm"] = WebMidi;
        window["wm_i"] = WebMidi.inputs;
        window["wm_o"] = WebMidi.outputs;
    }

    function printOutAllInputsAndOutputs() {
        WebMidi.inputs.forEach((input) => {
            console.log(input);
        });
        WebMidi.outputs.forEach((output) => {
            console.log(output);
        });
    }

    function playMIDINote(midiNoteNumber, velocity = 127.0) {
        console.log("PLAY MIDI NOTE");
        if (soundOutput === null) {
            console.log("playPianoNote: Piano has not been initialized.");
            return;
        }
        const duration = 0; // Setting duration to 0 means the note will NOT turn off automatically.
        const pianoKeyNumber = midiNoteNumber - 20;
        soundOutput.play(pianoKeyNumber, duration, velocity / 127.0);
    }

    function stopMIDINote(midiNoteNumber, velocity = 127.0) {
        console.log("STOP MIDI NOTE");
        if (soundOutput === null) {
            console.log("playPianoNote: Piano has not been initialized.");
            return;
        }
        const pianoKeyNumber = midiNoteNumber - 20;
        soundOutput.stop(pianoKeyNumber);
    }

    export function attachLogOutput(logOutputHandler) {
        logOutput = logOutputHandler;
    }
    export function attachDeviceListOutput(deviceListOutputHandler) {
        deviceListOutput = deviceListOutputHandler;
    }

    export function setInstrument(instrumentTypeString: string) {
        let instrumentType = InstrumentType.SynthBasic;
        switch (instrumentTypeString) {
            case Constants.Instrument.PIANO_GRAND:
                instrumentType = InstrumentType.Sampled_1;
                break;
            case Constants.Instrument.PIANO_ROCK:
                instrumentType = InstrumentType.Sampled_2;
                break;
            case Constants.Instrument.PIANO_ELECTRIC:
                instrumentType = InstrumentType.SynthMusicalJS;
                break;
            case Constants.Instrument.ORGAN_1:
                instrumentType = InstrumentType.SynthFM;
                break;
            case Constants.Instrument.ORGAN_2:
                instrumentType = InstrumentType.SynthAM;
                break;
            case Constants.Instrument.OTHER:
            default:
                instrumentType = InstrumentType.SynthBasic;
                break;
        }
        console.log("Set Instrument Type to " + instrumentTypeString + " / " + instrumentType);
        if (soundOutput) {
            soundOutput.dispose();
        }
        soundOutput = new Instrument(instrumentType);
    }
}

export default MIDIControllerIO;
