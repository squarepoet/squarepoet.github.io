import LUMIKeys from "apps/shared/midi/LUMIKeys";
import Instrument, { InstrumentType } from "apps/shared/sound/Instrument";
import WebMidi, { Input, Output } from "webmidi";

//
// Manufacturers:
//   Snoize / MIDI Monitor (Untitled XX)
// Manufacturer IDs (Hexadecimal)
//   CME XKey Air 00 20 63
//   ROLI         00 21 10
namespace MIDIControllerIO {
    let midiInputs: Input[] = [];
    let midiOutputs: Output[] = [];

    let soundOutput: Instrument = null;
    let logOutput: (msg: string) => void = null;
    let deviceListOutput: (deviceList: string) => void = null;

    let isStarted = false;

    export function start() {
        // Call start() only once!
        if (isStarted) {
            return;
        }
        isStarted = true;
        console.log("MIDIControllerIO.start()");

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
                midiInputs.push(i);
                let inputName = "  " + i.name;
                if (i.manufacturer !== "") {
                    inputName += "    " + i.manufacturer;
                }
                inputDeviceInfo.push(inputName);

                i.addListener("noteon", "all", function (e) {
                    noteOn(e.note.number, e.rawVelocity);
                });
                i.addListener("noteoff", "all", function (e) {
                    noteOff(e.note.number, e.rawVelocity);
                });
            }

            const outputDeviceInfo = [];
            for (const o of WebMidi.outputs) {
                midiOutputs.push(o);
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
            // output = WebMidi.getOutputByName("LUMI Keys Block KJ7T Bluetooth");
            // input = WebMidi.getInputByName("LUMI Keys Block KJ7T Bluetooth");

            // A connected device will have unique IDs for input and output ports.
            // These numbers aren't particularly useful, because they are unique to your machine and device,
            // and might even change if you plug a device into a different USB port.
            //   LUMI Keys Block KJ7T Bluetooth id: 1054130867
            //   LUMI Keys Block KJ7T Bluetooth id: -899739147
            //   Xkey Air 37 BLE Bluetooth id: -1021446226
            //   Xkey Air 37 BLE Bluetooth id: 1748751320
            //   MIDI Monitor by Snoize: -2075141395
            // output = WebMidi.getOutputById("1054130867");
            // output = WebMidi.getOutputById(-2075141395);

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

            // Send MIDI note on/off messages to the device.
            // In LUMI Keys, a playNote message will highlight the key (white).
            // output.playNote("C3");
            // output.stopNote("C3");

            // WebMidi.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240
        }, true /* SYSEX ENABLED */);
    }

    // In Chrome console: wm, wm_i, wm_o.
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

    export function attachLogOutput(logOutputHandler) {
        logOutput = logOutputHandler;
    }

    export function attachDeviceListOutput(deviceListOutputHandler) {
        deviceListOutput = deviceListOutputHandler;
    }

    export function setInstrument(instrumentType: InstrumentType) {
        if (soundOutput) {
            if (soundOutput.type === instrumentType) {
                console.log("You chose the same instrumentType. Nothing more to do here.");
                return;
            }
            soundOutput.dispose();
        }
        console.log("Set Instrument Type: " + instrumentType);
        soundOutput = new Instrument(instrumentType);
    }

    // midiNoteNumber 60 is Middle C
    // velocity ranges from 0 to 127
    function noteOn(midiNoteNumber: number, velocity: number) {
        logOutput("Note On: " + midiNoteNumber + "  Velocity: " + velocity);
        if (soundOutput) {
            const duration = 0; // Setting duration to 0 means the note will NOT turn off automatically.
            const pianoKeyNumber = midiNoteNumber - 20;
            soundOutput.play(pianoKeyNumber, duration, velocity / 127.0);
        }
    }

    // midiNoteNumber 60 is Middle C
    // velocity ranges from 0 to 127
    function noteOff(midiNoteNumber: number, velocity: number) {
        logOutput("Note Off: " + midiNoteNumber + "  Velocity: " + velocity);
        if (soundOutput) {
            const pianoKeyNumber = midiNoteNumber - 20;
            soundOutput.stop(pianoKeyNumber);
        }
    }
}

export default MIDIControllerIO;
