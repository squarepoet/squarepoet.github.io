import { useEffect } from "react";
import WebMidi from "webmidi";

const ROLI_MANUFACTURER_ID = [0x00, 0x21, 0x10];

const setVariablesForDebugging = () => {
    window["webmidi"] = WebMidi;
    window["m_in"] = WebMidi.inputs;
    window["m_out"] = WebMidi.outputs;
};

const printOutAllInputsAndOutputs = () => {
    WebMidi.inputs.forEach((input) => {
        console.log(input);
    });
    WebMidi.outputs.forEach((output) => {
        console.log(output);
    });
};

const createChecksum = (values) => {
    let sum = values.length;
    for (let i = 0; i < values.length; i++) {
        sum = (sum * 3 + values[i]) & 0xff;
    }
    return sum & 0x7f;
};

const Page = () => {
    let output;
    let input;

    if (typeof window !== "undefined") {
        WebMidi.enable(function (err) {
            if (err) {
                console.log("WebMidi could not be enabled.", err);
                return;
            }
            console.log("WebMidi enabled!");

            setVariablesForDebugging();
            printOutAllInputsAndOutputs();

            // Manufacturers:
            // Snoize / MIDI Monitor (Untitled XX)

            // output = WebMidi.outputs[0];
            // output = WebMidi.getOutputById("1584982307");
            // output = WebMidi.getOutputByName("LUMI Keys Block KJ7T Bluetooth");
            // LUMI Keys Block KJ7T Bluetooth id: 1054130867
            // Xkey Air 37 BLE Bluetooth id: -1021446226
            output = WebMidi.getOutputById("1054130867");

            // LUMI Keys Block KJ7T Bluetooth id: -899739147
            // Xkey Air 37 BLE Bluetooth id: 1748751320
            input = WebMidi.getInputByName("LUMI Keys Block KJ7T Bluetooth");

            input.addListener("sysex", "all", function (e) {
                console.log("SYSEX");
                console.log(e);
                const dataString = new TextDecoder("utf-8").decode(e.data);
                console.log("SYSEX DATA STRING:");
                console.log(dataString);
            });
            input.addListener("controlchange", "all", function (e) {
                console.log(e);
            });

            // m.getOutputById(-2075141395) MIDI Monitor by Snoize
            // o.playNote("C3")
            // o.stopNote("C3")

            WebMidi.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240

            // Manufacturer IDs (Hexadecimal)
            // CME XKey Air 00 20 63
            // ROLI         00 21 10

            // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt

            /*
            f000 2110 7707 0103 0063 f7
            ???

            f000 2110 7707 1010 4f00 0000 0000 45f7
            F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7

            f000 2110 7707 1010 6f00 0000 0000 25f7
            */
        }, true /* SYSEX ENABLED */);
    }

    const onClickLUMINoteOn = (noteName) => {
        output.playNote(noteName, "all", { duration: 2000 });
    };

    // github user benob has a different device ID:
    // [0x77, 0x37].concat(values).concat([checksum(values)]);
    // We should allow the user of this page to customize the device ID.
    // Maybe 0x37 was the kickstarter version of LUMI? How do we query the device ID?
    const sendLUMICommand = (command) => {
        const commandWithHeader = [0x77, 0x07].concat(command);
        const checksum = createChecksum(command);
        const commandWithHeaderAndCheckSum = commandWithHeader.concat(checksum);
        output.sendSysex(ROLI_MANUFACTURER_ID, commandWithHeaderAndCheckSum);
    };

    // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt
    // 0x07 is the device ID?
    const onClickLUMISetScaleRoot = (rootNote) => {
        switch (rootNote) {
            case "C":
            default:
                sendLUMICommand([0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "C#":
                sendLUMICommand([0x10, 0x30, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "D":
                sendLUMICommand([0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "D#":
                sendLUMICommand([0x10, 0x30, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "E":
                sendLUMICommand([0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "F":
                sendLUMICommand([0x10, 0x30, 0x23, 0x01, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "F#":
                sendLUMICommand([0x10, 0x30, 0x43, 0x01, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "G":
                sendLUMICommand([0x10, 0x30, 0x63, 0x01, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "G#":
                sendLUMICommand([0x10, 0x30, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "A":
                sendLUMICommand([0x10, 0x30, 0x23, 0x02, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "A#":
                sendLUMICommand([0x10, 0x30, 0x43, 0x02, 0x00, 0x00, 0x00, 0x00]);
                break;
            case "B":
                sendLUMICommand([0x10, 0x30, 0x63, 0x02, 0x00, 0x00, 0x00, 0x00]);
                break;
        }
    };

    /*
    BRIGHTNESS
    10 40 04 00 00 00 00 00 // 0%
    10 40 24 06 00 00 00 00 // 25%
    10 40 44 0C 00 00 00 00 // 50%
    10 40 64 12 00 00 00 00 // 75%
    10 40 04 19 00 00 00 00 // 100%
    */

    /*
    command: set color mode
    10 40 02 00 00 00 00 00 // rainbow
    10 40 22 00 00 00 00 00 // single color scale
    10 40 42 00 00 00 00 00 // piano
    10 40 62 00 00 00 00 00 // night
    */

    const onClickLUMISetScaleType = (rootNote) => {
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
        sendLUMICommand(command);
    };

    const onClickLUMISerial = () => {
        output.sendSysex(ROLI_MANUFACTURER_ID, [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T
    };

    // Unknown command:
    // - DEFINITELY NOT BATTERY LEVEL
    // 01 03 00
    // LUMI responds 8 times with:
    //   F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7
    const onClickLUMICheck_XXX1 = () => {
        const command = [0x01, 0x03, 0x00];
        sendLUMICommand(command);
    };

    const onClickLUMITest = () => {
        output.sendSysex(ROLI_MANUFACTURER_ID, [0x77, 0x07, 0x10, 0x02, 0x44]);
    };

    useEffect(() => {}, []);

    return (
        <div>
            <h1>MIDI Test Page</h1>
            <h2>LUMI</h2>
            <div>
                <div>Light Up Note</div>
                <div>
                    <button onClick={() => onClickLUMINoteOn("C4")}>Note On C4</button>
                    <button onClick={() => onClickLUMINoteOn("D4")}>Note On D4</button>
                    <button onClick={() => onClickLUMINoteOn("E4")}>Note On E4</button>
                    <button onClick={() => onClickLUMINoteOn("F4")}>Note On F4</button>
                    <button onClick={() => onClickLUMINoteOn("G4")}>Note On G4</button>
                    <button onClick={() => onClickLUMINoteOn("A4")}>Note On A4</button>
                    <button onClick={() => onClickLUMINoteOn("B4")}>Note On B4</button>
                </div>
            </div>
            <br />
            <div>
                <div>Set Scale Root</div>
                <div>
                    <button onClick={() => onClickLUMISetScaleRoot("C")}>C</button>
                    <button onClick={() => onClickLUMISetScaleRoot("C#")}>C#/Db</button>
                    <button onClick={() => onClickLUMISetScaleRoot("D")}>D</button>
                    <button onClick={() => onClickLUMISetScaleRoot("D#")}>D#/Eb</button>
                    <button onClick={() => onClickLUMISetScaleRoot("E")}>E</button>
                    <button onClick={() => onClickLUMISetScaleRoot("F")}>F</button>
                    <button onClick={() => onClickLUMISetScaleRoot("F#")}>F#/Gb</button>
                    <button onClick={() => onClickLUMISetScaleRoot("G")}>G</button>
                    <button onClick={() => onClickLUMISetScaleRoot("G#")}>G#/Ab</button>
                    <button onClick={() => onClickLUMISetScaleRoot("A")}>A</button>
                    <button onClick={() => onClickLUMISetScaleRoot("A#")}>A#/Bb</button>
                    <button onClick={() => onClickLUMISetScaleRoot("B")}>B</button>
                </div>
            </div>
            <div>
                <div>Set Scale Type</div>
                <div>
                    <button onClick={() => onClickLUMISetScaleType("chromatic")}>chromatic</button>
                    <button onClick={() => onClickLUMISetScaleType("major")}>major</button>
                    <button onClick={() => onClickLUMISetScaleType("minor")}>minor</button>
                    <button onClick={() => onClickLUMISetScaleType("pentatonic-major")}>major pentatonic</button>
                    <button onClick={() => onClickLUMISetScaleType("pentatonic-minor")}>minor pentatonic</button>
                    <button onClick={() => onClickLUMISetScaleType("blues")}>blues</button>
                    <button onClick={() => onClickLUMISetScaleType("harmonic-minor")}>harmonic minor</button>
                    <button onClick={() => onClickLUMISetScaleType("dorian")}>dorian</button>
                    <button onClick={() => onClickLUMISetScaleType("phrygian")}>phrygian</button>
                    <button onClick={() => onClickLUMISetScaleType("lydian")}>lydian</button>
                    <button onClick={() => onClickLUMISetScaleType("mixolydian")}>mixolydian</button>
                    <button onClick={() => onClickLUMISetScaleType("locrian")}>locrian</button>
                    <button onClick={() => onClickLUMISetScaleType("whole-tone")}>whole-tone</button>
                    <button onClick={() => onClickLUMISetScaleType("arabic-a")}>arabic-a</button>
                    <button onClick={() => onClickLUMISetScaleType("arabic-b")}>arabic-b</button>
                    <button onClick={() => onClickLUMISetScaleType("japanese")}>japanese</button>
                    <button onClick={() => onClickLUMISetScaleType("ryukyu")}>ryukyu</button>
                    <button onClick={() => onClickLUMISetScaleType("8-tone-spanish")}>8-tone-spanish</button>
                </div>
            </div>
            <br />
            <button onClick={onClickLUMICheck_XXX1}>Unknown Command 1</button>
            <br />
            <button onClick={onClickLUMISerial}>Serial Number</button>
            <br />
            <button onClick={onClickLUMITest}>Test XXX</button>
        </div>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "MIDI Tests",
        },
    };
}

// TEST LUMI KEYS
