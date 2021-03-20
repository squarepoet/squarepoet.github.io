import WebMidi, { Input, Output } from "webmidi";

// This approach was informed by:
// https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt
// https://github.com/WeAreROLI/roli_blocks_basics/blob/main/blocks/roli_BlockConfigId.h
// Note: You can drag *.littlefoot programs into the ROLI Dashboard to customize the program running on the LUMI Keys.
namespace LUMIKeys {
    // https://github.com/juce-framework/JUCE/blob/master/modules/juce_blocks_basics/protocol/juce_BitPackingUtilities.h
    // static const uint8 roliSysexHeader[] = { 0xf0, 0x00, 0x21, 0x10, 0x77 };
    const ROLI_MANUFACTURER_ID = [0x00, 0x21, 0x10];

    let inputs: Input[] = [];
    let outputs: Output[] = [];

    let logOutput: (msg: string) => void = null;

    // The DEVICE_ID might be different!
    // We should allow the user of this page to customize the device ID.
    // Maybe 0x37 was the kickstarter version of LUMI? How do we query the device ID?
    // 0x00    => Works 100% for ronyeh's LUMI.
    // 0x07    => Works 100% for ronyeh's LUMI.
    // 0x37    => Works for benob's LUMI, but NOT for ronyeh's LUMI.
    //
    // This might have something to do with topology.
    // See: https://github.com/juce-framework/JUCE/blob/master/modules/juce_blocks_basics/protocol/juce_BitPackingUtilities.h#L34
    //
    // When LUMI Keys responds with a SysEx, the deviceID (or topology ID?) is 47.
    //
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
        logOutput(getDataAsHexString(msgData));
    }

    function logMessageAsUTF8(msgData: Uint8Array) {
        const dataString = new TextDecoder("utf-8").decode(msgData);
        logOutput(dataString);
    }

    export function connect() {
        for (const i of WebMidi.inputs) {
            if (isLUMIKeys(i)) {
                inputs.push(i);

                i.addListener("midimessage", "all", function (e) {
                    logMessageAsHex(e.data);
                    // logMessageAsUTF8(e.data);

                    if (messageMatches(e.data, "F0 00 21 10 77 47 00 00 00 00 00 04 00 00 2C F7")) {
                        logOutput("POWER BUTTON PRESSED");
                    }
                    if (messageMatches(e.data, "F0 00 21 10 77 47 00 00 00 00 00 04 04 00 38 F7")) {
                        logOutput("OCTAVE DOWN PRESSED");
                    }
                    if (messageMatches(e.data, "F0 00 21 10 77 47 00 00 00 00 00 04 08 00 44 F7")) {
                        logOutput("OCTAVE UP PRESSED");
                    }
                });
            }
        }

        for (const o of WebMidi.outputs) {
            if (isLUMIKeys(o)) {
                logOutput("Found LUMI Keys with output port ID: " + o.id);
                outputs.push(o);
            }
        }
    }

    function sendSysExToAllDevices(sysexCMD) {
        for (const output of outputs) {
            output.sendSysex(ROLI_MANUFACTURER_ID, sysexCMD);
        }
    }

    function sendCommandToAllDevices(command) {
        const commandWithHeader = [0x77, deviceID].concat(command);
        const checksum = createChecksum(command);
        const commandWithHeaderAndCheckSum = commandWithHeader.concat(checksum);
        sendSysExToAllDevices(commandWithHeaderAndCheckSum);
    }

    function createChecksum(values) {
        let sum = values.length;
        for (let i = 0; i < values.length; i++) {
            sum = (sum * 3 + values[i]) & 0xff;
        }
        const returnVal = sum & 0x7f;
        console.log("Checksum: 0x" + returnVal.toString(16));
        return returnVal;
    }

    export function getClickHandler_SetScaleRoot(rootNote) {
        return () => {
            let command = [0x10, 0x30];
            switch (rootNote) {
                case "C":
                default:
                    // [0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00]
                    command.push(...[0x03, 0x00]);
                    break;
                case "C#":
                    // [0x10, 0x30, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x23, 0x00]);
                    break;
                case "D":
                    // [0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x43, 0x00]);
                    break;
                case "D#":
                    // [0x10, 0x30, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x63, 0x00]);
                    break;
                case "E":
                    // [0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x03, 0x01]);
                    break;
                case "F":
                    // [0x10, 0x30, 0x23, 0x01, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x23, 0x01]);
                    break;
                case "F#":
                    // [0x10, 0x30, 0x43, 0x01, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x43, 0x01]);
                    break;
                case "G":
                    // [0x10, 0x30, 0x63, 0x01, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x63, 0x01]);
                    break;
                case "G#":
                    // [0x10, 0x30, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x03, 0x02]);
                    break;
                case "A":
                    // [0x10, 0x30, 0x23, 0x02, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x23, 0x02]);
                    break;
                case "A#":
                    // [0x10, 0x30, 0x43, 0x02, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x43, 0x02]);
                    break;
                case "B":
                    // [0x10, 0x30, 0x63, 0x02, 0x00, 0x00, 0x00, 0x00];
                    command.push(...[0x63, 0x02]);
                    break;
            }
            command.push(...[0x00, 0x00, 0x00, 0x00]);
            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_SetBrightness(brightnessValue: number) {
        return () => {
            console.log("Set Brightness Level to " + brightnessValue + "%");
            const command = [0x10, 0x40];
            switch (brightnessValue) {
                case 0:
                    command.push(...[0x04, 0x00]);
                    break;
                case 1:
                    command.push(...[0x24, 0x00]);
                    break;
                case 10:
                    command.push(...[0x44, 0x02]);
                    break;
                case 20:
                    command.push(...[0x04, 0x05]);
                    break;
                case 25:
                    command.push(...[0x24, 0x06]);
                    break;
                case 50:
                    command.push(...[0x44, 0x0c]);
                    break;
                case 75:
                    command.push(...[0x64, 0x12]);
                    break;
                case 100:
                default:
                    command.push(...[0x04, 0x19]);
                    break;
            }
            command.push(...[0x00, 0x00, 0x00, 0x00]);
            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_ResetToFactorySettings() {
        return () => {
            logOutput("Factory Reset!");

            // ROLI Dashboard sends the following:
            // F0 00 21 10 77 07 11 14 F7
            // F0 00 21 10 49 F7
            // F0 00 21 10 78 3F F7
            // F0 00 21 10 78 3F F7

            sendCommandToAllDevices([0x11]);

            // See: https://github.com/juce-framework/JUCE/blob/master/modules/juce_blocks_basics/protocol/juce_BlocksProtocolDefinitions.h
            // constexpr uint8 resetMaster[6] = { 0xf0, 0x00, 0x21, 0x10, 0x49, 0xf7 };
            sendSysExToAllDevices([0x49]);

            // Who knows what this does?
            sendSysExToAllDevices([0x78, 0x3f]);
            sendSysExToAllDevices([0x78, 0x3f]);
        };
    }

    export function getClickHandler_SwitchToMode(modeNumber) {
        return () => {
            let command = null;
            logOutput("Switch to Mode " + modeNumber);
            switch (modeNumber) {
                case 1:
                default:
                    command = [0x10, 0x40, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00]; // Activate Mode 1
                    break;
                case 2:
                    command = [0x10, 0x40, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00]; // Activate Mode 2
                    break;
                case 3:
                    command = [0x10, 0x40, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00]; // Activate Mode 3
                    break;
                case 4:
                    command = [0x10, 0x40, 0x62, 0x00, 0x00, 0x00, 0x00, 0x00]; // Activate Mode 4
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
            logOutput("Set color of mode: " + modeNumber + " to " + modeType);
            let command = null;
            switch (modeType) {
                case "pro":
                    switch (modeNumber) {
                        case 1:
                        default:
                            command = [0x10, 0x40, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 => pro
                            break;
                        case 2:
                            command = [0x10, 0x30, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 2 => pro
                            break;
                        case 3:
                            command = [0x10, 0x20, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 3 => pro
                            break;
                        case 4:
                            command = [0x10, 0x10, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 4 => pro
                            break;
                    }
                    break;
                case "user":
                    switch (modeNumber) {
                        case 1:
                        default:
                            command = [0x10, 0x40, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                            break;
                        case 2:
                            command = [0x10, 0x30, 0x2d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 2
                            break;
                        case 3:
                            command = [0x10, 0x20, 0x2e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 3
                            break;
                        case 4:
                            command = [0x10, 0x10, 0x2f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 4
                            break;
                    }
                    break;
                case "piano":
                    switch (modeNumber) {
                        case 1:
                        default:
                            command = [0x10, 0x40, 0x4c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1
                            break;
                        case 2:
                            command = [0x10, 0x30, 0x4d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 2
                            break;
                        case 3:
                            command = [0x10, 0x20, 0x4e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 3
                            break;
                        case 4:
                            command = [0x10, 0x10, 0x4f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 4
                            break;
                    }
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

    // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T
    // See: https://github.com/juce-framework/JUCE/blob/master/modules/juce_blocks_basics/protocol/juce_BlocksProtocolDefinitions.h#L197
    // bool isLumiKeysBlock() const noexcept       { return hasPrefix ("LKB"); }
    export function getClickHandler_GetSerialNumber() {
        return () => {
            sendSysExToAllDevices([0x78, 0x3f]);
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

    // See: https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt
    // examples of color changes
    // 10 20 64 3F 00 00 7E 03 // blue
    // 10 20 04 40 7F 00 7E 03 // green
    // 10 20 04 00 00 7F 7F 03 // red
    // 10 20 04 40 7F 7F 7F 03 // yellow
    // 10 20 64 3F 00 7F 7F 03 // magenta
    // 10 20 64 7F 7F 00 7E 03 // cyan

    // bit encoding of colors:
    // 00100 BLUE_8_BITS GREEN_8_BITS RED_8_BITS 111111
    // blue    1100100 0111111 0000000 0000000 1111110
    // green   0000100 1000000 1111111 0000000 1111110
    // red     0000100 0000000 0000000 1111111 1111111
    // yellow  0000100 1000000 1111111 1111111 1111111
    // magenta 1100100 0111111 0000000 1111111 1111111
    // cyan    1100100 1111111 1111111 0000000 1111110
    // black   0000100 0000000 0000000 0000000 1111110
    // white   1100100 1111111 1111111 1111111 1111111

    /*
    v1 = ((b & 0x3) << 5) | 0x4,
    v2 = ((b >> 2) & 0x3f) | (g & 1),
    v3 = g >> 1,
    v4 = r & 0x7f,
    v5 = (r >> 7) | 0x7e,
    */
    // Remember in the MIDI world 0x7f is the same as a row of all 1s.
    export function getClickHandler_SetColorGlobalKey(color: string, red?: number, green?: number, blue?: number) {
        return () => {
            setColorGlobalKey(color, red, green, blue);
        };
    }

    export function setColorGlobalKey(color: string, red?: number, green?: number, blue?: number) {
        let command = [0x10, 0x20];
        switch (color) {
            case "rgb":
                let v1 = ((blue & 0x3) << 5) | 0x4;
                let v2 = ((blue >> 2) & 0x3f) | (green & 1);
                let v3 = green >> 1;
                let v4 = red & 0x7f;
                let v5 = (red >> 7) | 0x7e;
                command.push(...[v1, v2, v3, v4, v5]);
                break;
            case "blue":
                command.push(...[0x64, 0x3f, 0x00, 0x00, 0x7e]); // blue
                break;
            case "green":
                command.push(...[0x04, 0x40, 0x7f, 0x00, 0x7e]); // green
                break;
            case "red":
                command.push(...[0x04, 0x00, 0x00, 0x7f, 0x7f]); // red
                break;
            case "yellow":
                command.push(...[0x04, 0x40, 0x7f, 0x7f, 0x7f]); // yellow
                break;
            case "magenta":
                command.push(...[0x64, 0x3f, 0x00, 0x7f, 0x7f]); // magenta
                break;
            case "cyan":
                command.push(...[0x64, 0x7f, 0x7f, 0x00, 0x7e]); // cyan
                break;
            case "black":
                console.log("BLACK");
                command.push(...[0x04, 0x00, 0x00, 0x00, 0x7e]); // black
                break;
            case "white":
            default:
                command.push(...[0x64, 0x7f, 0x7f, 0x7f, 0x7f]); // white
                break;
        }
        command.push(0x03);
        console.log(command);
        sendCommandToAllDevices(command);
    }

    export function getClickHandler_SetColorRootKey(color: string, red?: number, green?: number, blue?: number) {
        return () => {
            setColorRootKey(color, red, green, blue);
        };
    }

    export function setColorRootKey(color: string, red?: number, green?: number, blue?: number) {
        let command = [0x10, 0x30];
        switch (color) {
            case "rgb":
                let v1 = ((blue & 0x3) << 5) | 0x4;
                let v2 = ((blue >> 2) & 0x3f) | (green & 1);
                let v3 = green >> 1;
                let v4 = red & 0x7f;
                let v5 = (red >> 7) | 0x7e;
                command.push(...[v1, v2, v3, v4, v5]);
                break;
            case "blue":
                command.push(...[0x64, 0x3f, 0x00, 0x00, 0x7e]); // blue
                break;
            case "green":
                command.push(...[0x04, 0x40, 0x7f, 0x00, 0x7e]); // green
                break;
            case "red":
                command.push(...[0x04, 0x00, 0x00, 0x7f, 0x7f]); // red
                break;
            case "yellow":
                command.push(...[0x04, 0x40, 0x7f, 0x7f, 0x7f]); // yellow
                break;
            case "magenta":
                command.push(...[0x64, 0x3f, 0x00, 0x7f, 0x7f]); // magenta
                break;
            case "cyan":
                command.push(...[0x64, 0x7f, 0x7f, 0x00, 0x7e]); // cyan
                break;
            case "black":
                command.push(...[0x04, 0x00, 0x00, 0x00, 0x7e]); // black
                break;
            case "white":
            default:
                command.push(...[0x64, 0x7f, 0x7f, 0x7f, 0x7f]); // white
                break;
        }
        command.push(0x03);
        console.log(command);
        sendCommandToAllDevices(command);
    }

    /*
        Note that 0x7F is 0111_1111 in binary.
        MIDI SysEx messages have a beginning status byte and a ending status byte.
        In between the two status bytes, any number of data bytes may be sent. 
        These data bytes all range from 0 to 127. The left most bit is always 0.
        
        10 40 00 7F 7F 7F 7F 03 // -4
        10 40 20 7F 7F 7F 7F 03 // -3
        10 40 40 7F 7F 7F 7F 03 // -2
        10 40 60 7F 7F 7F 7F 03 // -1
        10 40 00 00 00 00 00 00 // 0
        10 40 20 00 00 00 00 00 // 1
        10 40 40 00 00 00 00 00 // 2
        10 40 60 01 00 00 00 00 // 3
        10 40 00 01 00 00 00 00 // 4
        10 40 20 01 00 00 00 00 // 5
    */
    export function getClickHandler_SetOctave(octaveNumber: number) {
        return () => {
            console.log("Set Octave Offset to " + octaveNumber);
            const command = [0x10, 0x40];
            switch (octaveNumber) {
                case 0:
                default:
                    command.push(...[0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case 1:
                    command.push(...[0x20, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case 2:
                    command.push(...[0x40, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case 3:
                    command.push(...[0x60, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case 4:
                    command.push(...[0x00, 0x01, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case 5:
                    command.push(...[0x20, 0x01, 0x00, 0x00, 0x00, 0x00]);
                    break;
                case -1:
                    command.push(...[0x60, 0x7f, 0x7f, 0x7f, 0x7f, 0x03]);
                    break;
                case -2:
                    command.push(...[0x40, 0x7f, 0x7f, 0x7f, 0x7f, 0x03]);
                    break;
                case -3:
                    command.push(...[0x20, 0x7f, 0x7f, 0x7f, 0x7f, 0x03]);
                    break;
                case -4:
                    command.push(...[0x00, 0x7f, 0x7f, 0x7f, 0x7f, 0x03]);
                    break;
            }
            sendCommandToAllDevices(command);
        };
    }

    export function getClickHandler_PitchBend(modeNumber, enableFlag) {
        return () => {
            console.log("Set Pitch Bend for Mode " + modeNumber + " to " + enableFlag);
            let command = null;
            switch (modeNumber) {
                case 1:
                default:
                    if (enableFlag) {
                        command = [0x10, 0x60, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend ON
                    } else {
                        command = [0x10, 0x60, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend OFF
                    }
                    break;
                case 2:
                    if (enableFlag) {
                        command = [0x10, 0x50, 0x2d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend ON
                    } else {
                        command = [0x10, 0x50, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend OFF
                    }
                    break;
                case 3:
                    if (enableFlag) {
                        command = [0x10, 0x40, 0x2e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend ON
                    } else {
                        command = [0x10, 0x40, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend OFF
                    }
                    break;
                case 4:
                    if (enableFlag) {
                        command = [0x10, 0x30, 0x2f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend ON
                    } else {
                        command = [0x10, 0x30, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00]; // Mode 1 Pitch Bend OFF
                    }
                    break;
            }
            sendCommandToAllDevices(command);
        };
    }

    // ROLI Dashboard keeps sending this message every ~400ms.
    // Maybe it's just a ping to see that it's still connected.
    // It's DEFINITELY NOT BATTERY LEVEL, because LUMI Keys responds with the same message despite varying battery levels.
    // See: https://github.com/juce-framework/JUCE/blob/master/modules/juce_blocks_basics/protocol/juce_BlocksProtocolDefinitions.h
    //
    //     deviceCommandMessage    = 0x01,
    //     ping                    = 0x03,
    //
    // LUMI responds 8 times with:
    //   F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7
    export function getClickHandler_PingDevice() {
        return () => {
            const command = [0x01, 0x03, 0x00];
            sendCommandToAllDevices(command);
        };
    }

    export function runCommand_001() {
        setTimeout(() => {
            // Highlight G ... D
            // The below works ONLY WHEN ROLI STUDIO IS THE FRONT APP ON MACOS.
            // Thus, we add a 5 second delay after clicking this button so we have time to switch apps! :-}
            sendCommandToAllDevices([0x03, 0x02, 0x00, 0x00, 0x00, 0x70, 0x09, 0x00, 0x00, 0x00, 0x7e, 0x7f, 0x7f, 0x0f, 0x00]);
            sendCommandToAllDevices([0x03, 0x02, 0x00, 0x00, 0x00, 0x60, 0x0a, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
            sendCommandToAllDevices([0x03, 0x04, 0x00, 0x00, 0x00, 0x70, 0x09, 0x00, 0x00, 0x00, 0x7e, 0x7f, 0x7f, 0x0f, 0x00]);
            sendCommandToAllDevices([0x03, 0x04, 0x00, 0x00, 0x00, 0x60, 0x0a, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
        }, 5000);

        /*
            setTimeout(() => {
                // Highlight C E G ... F
                // The below works ONLY WHEN ROLI STUDIO IS THE FRONT APP ON MACOS.
                // Thus, we add a 5 second delay after clicking this button so we have time to switch apps! :-}
                sendCommandToAllDevices([0x03, 0x02, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x00, 0x7e, 0x7f, 0x7f, 0x0f, 0x00]);
                sendCommandToAllDevices([0x03, 0x02, 0x00, 0x00, 0x00, 0x40, 0x09, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
                sendCommandToAllDevices([0x03, 0x02, 0x00, 0x00, 0x00, 0x70, 0x09, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
                sendCommandToAllDevices([0x03, 0x02, 0x00, 0x00, 0x00, 0x10, 0x0b, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
                sendCommandToAllDevices([0x03, 0x04, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x00, 0x7e, 0x7f, 0x7f, 0x0f, 0x00]);
                sendCommandToAllDevices([0x03, 0x04, 0x00, 0x00, 0x00, 0x40, 0x09, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
                sendCommandToAllDevices([0x03, 0x04, 0x00, 0x00, 0x00, 0x70, 0x09, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
                sendCommandToAllDevices([0x03, 0x04, 0x00, 0x00, 0x00, 0x10, 0x0b, 0x00, 0x00, 0x00, 0x40, 0x43, 0x68, 0x0b, 0x00]);
            }, 5000);
            */
    }

    export function runCommand_002() {
        console.log("runCommand_002");

        // const command = [0x77, 0x00, 0x01, 0x01, 0x00, 0x5d];
        // ?? LUMI responds with: f000 2110 7747 0000 0000 1010 2000 0066 2521 221c 5a61 6b60 5c5a 6525 651b 6a03 4c61 4121 4c6b 4c2b 0c60 6121 0000 74f7

        const command = [0x77, 0x07, 0x10, 0x02, 0x44];
        // ?? LUMI responds with 7 messages!!!
        /*
            ROLI 97 bytes	F0 00 21 10 77 47 00 00 00 00 00 13 31 48 40 00 00 00 00 00 00 00 00 00 02 00 00 00 00 43 06 40…
            ROLI 95 bytes	F0 00 21 10 77 47 00 00 00 00 00 43 50 00 00 00 00 00 00 00 00 00 08 00 00 00 00 18 24 01 10 00…
            ROLI 95 bytes	F0 00 21 10 77 47 00 00 00 00 00 43 1E 00 00 00 00 00 00 00 00 00 08 00 00 00 00 18 04 62 1F 00…
            ROLI 95 bytes	F0 00 21 10 77 47 00 00 00 00 00 43 44 00 00 70 7F 3F 00 00 00 00 7C 7F 7F 7F 3F 18 34 64 3F 00…
            ROLI 95 bytes	F0 00 21 10 77 47 00 00 00 00 00 43 48 05 00 00 00 00 00 00 00 00 20 00 00 00 00 18 64 2C 00 00…
            ROLI 95 bytes	F0 00 21 10 77 47 00 00 00 00 00 43 5C 05 00 00 00 00 00 00 00 00 08 00 00 00 00 18 24 4E 00 00…
            ROLI 46 bytes	F0 00 21 10 77 47 00 00 00 00 00 43 76 05 00 00 00 00 00 00 00 00 08 00 00 00 00 18 44 0F 00 00 00 00 00 00 00 00 40 00  00 00 00 00 5B F7
        */
        sendSysExToAllDevices(command);
    }

    export function attachLogOutput(logHandler) {
        logOutput = logHandler;
    }

    export function startFakeDevice() {
        // Send out SysEx messages to fake out ROLI Connect / Dashboard / Studio???
        // #TODO: Is this possible????
        // THIS PROBABLY WON'T WORK WITHOUT A NATIVE MACOS APP THAT PRETENDS TO BE A LUMI KEYS.
        // sendSysExToAllDevices([ ... ]);
        // setInterval(() => {
        //     sendSysExToAllDevices([0x77, 0x47, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x6d]); // Acknowledge the PING
        // }, 400);
    }
}

export default LUMIKeys;
