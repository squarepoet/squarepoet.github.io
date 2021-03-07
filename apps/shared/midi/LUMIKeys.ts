import WebMidi, { Input, Output } from "webmidi";

// This approach was inspired by:
// https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt
namespace LUMIKeys {
    const ROLI_MANUFACTURER_ID = [0x00, 0x21, 0x10];

    let inputs: Input[] = [];
    let outputs: Output[] = [];

    // The DEVICE_ID might be different!
    // We should allow the user of this page to customize the device ID.
    // Maybe 0x37 was the kickstarter version of LUMI? How do we query the device ID?
    // 0x00    => Works 100% for ronyeh's LUMI.
    // 0x07    => Works 100% for ronyeh's LUMI.
    // 0x37    => Works for benob's LUMI, but NOT for ronyeh's LUMI.
    let deviceID = 0x07;
    function setDeviceID(devID) {
        deviceID = devID;
    }

    function isLUMIKeys(io: Input | Output) {
        return io.manufacturer.startsWith("ROLI") && io.name.startsWith("LUMI");
    }

    export function connect() {
        for (const i of WebMidi.inputs) {
            if (isLUMIKeys(i)) {
                inputs.push(i);

                i.addListener("midimessage", "all", function (e) {
                    console.log("LUMI Keys: midimessage");
                    console.log(e);
                    const dataString = new TextDecoder("utf-8").decode(e.data);
                    console.log(dataString);
                });
            }
        }

        for (const o of WebMidi.outputs) {
            if (isLUMIKeys(o)) {
                console.log("Found LUMI Keys");
                console.log("Output Port ID: " + o.id);
                outputs.push(o);
            }
        }
    }

    function sendCommandToAllDevices(command) {
        const commandWithHeader = [0x77, deviceID].concat(command);
        const checksum = createChecksum(command);
        const commandWithHeaderAndCheckSum = commandWithHeader.concat(checksum);
        for (const output of outputs) {
            output.sendSysex(ROLI_MANUFACTURER_ID, commandWithHeaderAndCheckSum);
        }
    }

    function createChecksum(values) {
        let sum = values.length;
        for (let i = 0; i < values.length; i++) {
            sum = (sum * 3 + values[i]) & 0xff;
        }
        return sum & 0x7f;
    }

    export function getClickHandler_SetScaleRoot(rootNote) {
        return () => {
            switch (rootNote) {
                case "C":
                default:
                    sendCommandToAllDevices([0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "C#":
                    sendCommandToAllDevices([0x10, 0x30, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "D":
                    sendCommandToAllDevices([0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "D#":
                    sendCommandToAllDevices([0x10, 0x30, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "E":
                    sendCommandToAllDevices([0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "F":
                    sendCommandToAllDevices([0x10, 0x30, 0x23, 0x01, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "F#":
                    sendCommandToAllDevices([0x10, 0x30, 0x43, 0x01, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "G":
                    sendCommandToAllDevices([0x10, 0x30, 0x63, 0x01, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "G#":
                    sendCommandToAllDevices([0x10, 0x30, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "A":
                    sendCommandToAllDevices([0x10, 0x30, 0x23, 0x02, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "A#":
                    sendCommandToAllDevices([0x10, 0x30, 0x43, 0x02, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case "B":
                    sendCommandToAllDevices([0x10, 0x30, 0x63, 0x02, 0x00, 0x00, 0x00, 0x00]);
                    break;
            }
        };
    }

    export function getClickHandler_SetBrightness(brightnessValue: number) {
        return () => {
            let command = null;
            switch (brightnessValue) {
                case 0:
                    command = [0x10, 0x40, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00];
                    break;
                case 25:
                    command = [0x10, 0x40, 0x24, 0x06, 0x00, 0x00, 0x00, 0x00];
                    break;
                case 50:
                    command = [0x10, 0x40, 0x44, 0x0c, 0x00, 0x00, 0x00, 0x00];
                    break;
                case 75:
                    command = [0x10, 0x40, 0x64, 0x12, 0x00, 0x00, 0x00, 0x00];
                    break;
                case 100:
                default:
                    command = [0x10, 0x40, 0x04, 0x19, 0x00, 0x00, 0x00, 0x00];
                    break;
            }
            sendCommandToAllDevices(command);
        };
    }

    // PRO
    // 10 40 0C 00 00 00 00 00 5C F7
    // USER
    // 10 40 2C 00 00 00 00 00 3C F7
    // PIANO
    // 10 40 4C 00 00 00 00 00 1C F7
    // STAGE
    // 10 40 6C 00 00 00 00 00 7C F7
    // RAINBOW
    // 10 40 0C 01 00 00 00 00 2D F7
    export function getClickHandler_SetColorMode(modeName) {
        return () => {
            let command = null;
            switch (modeName) {
                case "pro":
                    command = [0x10, 0x40, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00];
                    break;
                case "user":
                    command = [0x10, 0x40, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x00];
                    break;
                case "piano":
                    command = [0x10, 0x40, 0x4c, 0x00, 0x00, 0x00, 0x00, 0x00];
                    break;
                case "stage":
                    command = [0x10, 0x40, 0x6c, 0x00, 0x00, 0x00, 0x00, 0x00];
                    break;
                case "rainbow":
                default:
                    command = [0x10, 0x40, 0x0c, 0x01, 0x00, 0x00, 0x00, 0x00];
                    break;
            }
            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_SetScaleType(rootNote) {
        return () => {
            let command = null;
            switch (rootNote) {
                case "chromatic":
                    command = [0x10, 0x60, 0x42, 0x04, 0x00, 0x00, 0x00, 0x00]; // chromatic
                    break;
                case "major":
                default:
                    command = [0x10, 0x60, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00]; // major
                    break;
                case "minor":
                    command = [0x10, 0x60, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00]; // minor
                    break;
                case "pentatonic-neutral":
                    command = [0x10, 0x60, 0x62, 0x00, 0x00, 0x00, 0x00, 0x00]; // pentatonic neutral
                    break;
                case "pentatonic-major":
                    command = [0x10, 0x60, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00]; // pentatonic major
                    break;
                case "pentatonic-minor":
                    command = [0x10, 0x60, 0x22, 0x01, 0x00, 0x00, 0x00, 0x00]; // pentatonic minor
                    break;
                case "blues":
                    command = [0x10, 0x60, 0x42, 0x01, 0x00, 0x00, 0x00, 0x00]; // blues
                    break;
                case "harmonic-minor":
                    command = [0x10, 0x60, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00]; // harmonic minor
                    break;
                case "dorian":
                    command = [0x10, 0x60, 0x62, 0x01, 0x00, 0x00, 0x00, 0x00]; // dorian
                    break;
                case "phrygian":
                    command = [0x10, 0x60, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00]; // phrygian
                    break;
                case "lydian":
                    command = [0x10, 0x60, 0x22, 0x02, 0x00, 0x00, 0x00, 0x00]; // lydian
                    break;
                case "mixolydian":
                    command = [0x10, 0x60, 0x42, 0x02, 0x00, 0x00, 0x00, 0x00]; // mixolydian
                    break;
                case "locrian":
                    command = [0x10, 0x60, 0x62, 0x02, 0x00, 0x00, 0x00, 0x00]; // locrian
                    break;
                case "whole-tone":
                    command = [0x10, 0x60, 0x02, 0x03, 0x00, 0x00, 0x00, 0x00]; // whole tone
                    break;
                case "arabic-a":
                    command = [0x10, 0x60, 0x22, 0x02, 0x00, 0x00, 0x00, 0x00]; // arabic (a)
                    break;
                case "arabic-b":
                    command = [0x10, 0x60, 0x42, 0x03, 0x00, 0x00, 0x00, 0x00]; // arabic (b)
                    break;
                case "japanese":
                    command = [0x10, 0x60, 0x62, 0x03, 0x00, 0x00, 0x00, 0x00]; // japanese
                    break;
                case "ryukyu":
                    command = [0x10, 0x60, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00]; // ryukyu
                    break;
                case "8-tone-spanish":
                    command = [0x10, 0x60, 0x22, 0x04, 0x00, 0x00, 0x00, 0x00]; // 8-tone spanish
                    break;
            }
            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_GetSerialNumber() {
        return () => {
            for (const output of outputs) {
                output.sendSysex(ROLI_MANUFACTURER_ID, [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T
            }
        };
    }

    // Sends a NoteOn and then a NoteOff after 1.2 seconds.
    export function getClickHandler_Highlight(noteName: string) {
        return () => {
            for (const output of outputs) {
                output.playNote(noteName, "all", { duration: 1200 /* ms */ });
            }
        };
    }

    // Unknown command: 01 03 00
    // - DEFINITELY NOT BATTERY LEVEL
    // Maybe it tells the lumi to stay awake? Don't dim?
    //
    // LUMI responds 8 times with:
    //   F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7
    export function getClickHandler_TestXXX1() {
        const command = [0x01, 0x03, 0x00];
        return () => {
            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_TestXXX2() {
        //
        return () => {
            for (const output of outputs) {
                // F0 00 21 10 77 00 01 01 00 5D
                output.sendSysex(ROLI_MANUFACTURER_ID, [0x10, 0x77, 0x00, 0x01, 0x01, 0x00, 0x5d]);
                // output.sendSysex(ROLI_MANUFACTURER_ID, [0x77, 0x07, 0x10, 0x02, 0x44]);
            }
        };
    }
}

export default LUMIKeys;
