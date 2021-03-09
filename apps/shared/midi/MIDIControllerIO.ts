import WebMidi, { Input, Output } from "webmidi";

import Instrument from "../sound/Instrument";
import LUMIKeys from "./LUMIKeys";

// Manufacturers:
// Snoize / MIDI Monitor (Untitled XX)
namespace MIDIControllerIO {
    let inputs: Input[] = [];
    let outputs: Output[] = [];

    let soundOutput: Instrument = null;
    let logOutput: (msg: string) => void = null;
    let deviceListOutput: (deviceList: string) => void = null;

    export function start() {
        soundOutput = new Instrument();

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
                inputDeviceInfo.push([i.manufacturer, i.name].join(" / "));

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
                outputDeviceInfo.push([o.manufacturer, o.name].join(" / "));
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
        if (soundOutput === null) {
            console.log("playPianoNote: Piano has not been initialized.");
            return;
        }
        const duration = 0; // Setting duration to 0 means the note will NOT turn off automatically.
        const pianoKeyNumber = midiNoteNumber - 20;
        soundOutput.play(pianoKeyNumber, duration, velocity / 127.0);
    }

    function stopMIDINote(midiNoteNumber, velocity = 127.0) {
        if (soundOutput === null) {
            console.log("playPianoNote: Piano has not been initialized.");
            return;
        }
        const duration = 0; // Setting duration to 0 means the note will NOT turn off automatically.
        const pianoKeyNumber = midiNoteNumber - 20;
        soundOutput.stop(pianoKeyNumber);
    }

    export function attachLogOutput(logOutputHandler) {
        logOutput = logOutputHandler;
    }
    export function attachDeviceListOutput(deviceListOutputHandler) {
        deviceListOutput = deviceListOutputHandler;
    }
}

export default MIDIControllerIO;
