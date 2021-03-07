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
    // let deviceID = 0x07;
    let deviceID = 0x00;
    function setDeviceID(devID) {
        deviceID = devID;
    }

    function isLUMIKeys(io: Input | Output) {
        return io.manufacturer.startsWith("ROLI") && io.name.startsWith("LUMI");
    }

    function messageMatches(msgData: Uint8Array, msgString: string) {
        return getDataAsHexString(msgData) === msgString;
    }

    // Return MIDI data as an uppercase string of hex numbers, space delimited.
    // We do not include the prefix 0x.
    // Example:
    //     "F0 00 21 10 77 47 00 00 00 00 00 04 00 00 2C F7"
    function getDataAsHexString(msgData: Uint8Array) {
        if (!msgData || msgData.length === 0) {
            return "";
        }

        let hexStrings = [];
        for (const byte of msgData) {
            hexStrings.push(byte.toString(16).padStart(2, "0").toUpperCase());
        }
        return hexStrings.join(" ");
    }

    function logMessageAsHex(msgData: Uint8Array) {
        console.log(getDataAsHexString(msgData));
    }

    export function connect() {
        for (const i of WebMidi.inputs) {
            if (isLUMIKeys(i)) {
                inputs.push(i);

                i.addListener("midimessage", "all", function (e) {
                    // const dataString = new TextDecoder("utf-8").decode(e.data);
                    // console.log(dataString);

                    logMessageAsHex(e.data);

                    if (messageMatches(e.data, "F0 00 21 10 77 47 00 00 00 00 00 04 00 00 2C F7")) {
                        console.log("POWER BUTTON PRESSED");
                    }
                    if (messageMatches(e.data, "F0 00 21 10 77 47 00 00 00 00 00 04 04 00 38 F7")) {
                        console.log("OCTAVE DOWN PRESSED");
                    }
                    if (messageMatches(e.data, "F0 00 21 10 77 47 00 00 00 00 00 04 08 00 44 F7")) {
                        console.log("OCTAVE UP PRESSED");
                    }
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
    export function getClickHandler_SetColorMode(modeNumber, modeType) {
        return () => {
            console.log("Set color of mode: " + modeNumber + " to " + modeType);
            let command = null;
            switch (modeType) {
                case "pro":
                    switch (modeNumber) {
                        case 1:
                        default:
                            command = [0x10, 0x40, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                            break;
                        case 2:
                            command = [0x10, 0x30, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 2
                            break;
                        case 3:
                            command = [0x10, 0x20, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 3
                            break;
                        case 4:
                            command = [0x10, 0x10, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 4
                            break;
                    }
                    break;
                case "user":
                    command = [0x10, 0x40, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                    console.log("ONLY MODE 1 IMPLEMENTED");
                    break;
                case "piano":
                    command = [0x10, 0x40, 0x4c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                    console.log("ONLY MODE 1 IMPLEMENTED");
                    break;
                case "stage":
                    switch (modeNumber) {
                        case 1:
                        default:
                            command = [0x10, 0x40, 0x6c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                            break;
                        case 2:
                            command = [0x10, 0x30, 0x6d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 2
                            break;
                        case 3:
                            command = [0x10, 0x20, 0x6e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 3
                            break;
                        case 4:
                            command = [0x10, 0x10, 0x6f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 4
                            break;
                    }
                    break;
                case "rainbow":
                default:
                    switch (modeNumber) {
                        case 1:
                        default:
                            command = [0x10, 0x40, 0x0c, 0x01, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                            break;
                        case 2:
                            command = [0x10, 0x30, 0x0d, 0x01, 0x00, 0x00, 0x00, 0x00]; // Mode 2
                            break;
                        case 3:
                            command = [0x10, 0x20, 0x0e, 0x01, 0x00, 0x00, 0x00, 0x00]; // Mode 3
                            break;
                        case 4:
                            command = [0x10, 0x10, 0x0f, 0x01, 0x00, 0x00, 0x00, 0x00]; // Mode 4
                            break;
                    }
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

    export function getClickHandler_SetColorGlobalKey() {
        return () => {
            //const command = [0x10, 0x20, 0x64, 0x3f, 0x00, 0x00, 0x7e, 0x03]; // blue
            const command = [0x10, 0x20, 0x04, 0x40, 0x7f, 0x7f, 0x7f, 0x03]; // yellow
            // 10 20 64 3F 00 00 7E 03 // blue
            // 10 20 04 40 7F 00 7E 03 // green
            // 10 20 04 00 00 7F 7F 03 // red
            // 10 20 04 40 7F 7F 7F 03 // yellow
            // 10 20 64 3F 00 7F 7F 03 // magenta
            // 10 20 64 7F 7F 00 7E 03 // cyan

            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_SetColorRootKey() {
        return () => {
            // const command = [0x10, 0x30, 0x64, 0x3f, 0x00, 0x00, 0x7e, 0x03]; // blue
            const command = [0x10, 0x30, 0x64, 0x3f, 0x00, 0x00, 0x7e, 0x03]; // blue
            sendCommandToAllDevices(command);
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
