import SetOctaveAndBrightnessPanel from "apps/midi/SetOctaveAndBrightnessPanel";
import UserColorsPanel from "apps/midi/UserColorsPanel";
import Constants from "apps/shared/Constants";
import LUMIKeys from "apps/shared/midi/LUMIKeys";
import MIDIControllerIO from "apps/shared/midi/MIDIControllerIO";
import { InstrumentType, validateInstrumentType } from "apps/shared/sound/Instrument";
import { Spacer30px, Spacer60px } from "components/Spacer";
import React, { useEffect, useState } from "react";
import store from "store2";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    label: {
        color: "gray",
    },
    select: {
        marginTop: theme.spacing(2),
        color: "white",
    },
}));

const Page = () => {
    const classes = useStyles();

    const [deviceList, setDeviceList] = useState("Looking for MIDI Devices...");

    const [midiEventsLog, setMIDIEventsLog] = useState("");
    const midiEventsLogArray = [];

    const [lumiEventsLog, setLUMIEventsLog] = useState("");
    const lumiEventsLogArray = [];

    // Which Tone.js/Musical.js instrument should we use?
    const [selectedInstrument, setSelectedInstrument] = useState(InstrumentType.SynthBasic);

    const onSelectInstrumentChange = (e) => {
        const instrumentType = validateInstrumentType(e.target.value);
        console.log("Saving " + instrumentType);
        store.set(Constants.StoreKeys.PIANO_TYPE, instrumentType);
        setSelectedInstrument(instrumentType);
        MIDIControllerIO.setInstrument(instrumentType);
    };

    useEffect(() => {
        document.ontouchstart = () => {
            console.log("Touch Start");
        };

        document.onmousedown = () => {
            console.log("Mouse Down");
        };

        window.addEventListener(
            "scroll",
            () => {
                console.log("Scroll " + Math.random());
                MIDIControllerIO.start();
            },
            true /* useCapture */
        );

        const savedInstrument = store.get(Constants.StoreKeys.PIANO_TYPE);
        setSelectedInstrument(savedInstrument);

        // Print a color message to the console.
        console.log("%cHello MIDI 🎹", "color:yellow;font-size:22px;font-weight:bold;background:black;");

        // Add some info to the informational text area.
        setMIDIEventsLog("Press some keys on your MIDI controller to play sounds.");
        setLUMIEventsLog("Connect your LUMI Keys via Bluetooth or USB.");

        MIDIControllerIO.attachLogOutput((msg) => {
            console.log(msg);
            midiEventsLogArray.unshift(msg);
            setMIDIEventsLog(midiEventsLogArray.join("\n"));
        });

        MIDIControllerIO.attachDeviceListOutput((txt) => {
            setDeviceList(txt);
        });

        LUMIKeys.attachLogOutput((msg) => {
            console.log(msg);
            lumiEventsLogArray.unshift(msg);
            setLUMIEventsLog(lumiEventsLogArray.join("\n"));
        });
    }, []);

    return (
        <>
            <div>
                <h1>MIDI Test Page</h1>
                <h2>Devices</h2>
                <div className="devicesSectionLayout">
                    <div className="eventsLog midi">
                        <pre>{midiEventsLog}</pre>
                    </div>
                    <div className="deviceList">
                        <pre>{deviceList}</pre>
                    </div>
                </div>
                <br />
                <FormControl className={classes.form}>
                    <InputLabel id="select-instrument-label" className={classes.label}>
                        Instrument Sound
                    </InputLabel>
                    <Select labelId="select-instrument-label" value={selectedInstrument} id="select-instrument" onChange={onSelectInstrumentChange} label="Instrument" className={classes.select}>
                        <MenuItem value={InstrumentType.Sampled_1}>Piano #1</MenuItem>
                        <MenuItem value={InstrumentType.Sampled_2}>Piano #2</MenuItem>
                        <MenuItem value={InstrumentType.SynthMusicalJS}>Piano #3</MenuItem>
                        <MenuItem value={InstrumentType.SynthFM}>Piano #4</MenuItem>
                        <MenuItem value={InstrumentType.SynthAM}>Piano #5</MenuItem>
                        <MenuItem value={InstrumentType.SynthBasic}>Piano #6</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <hr />
                <h2>LUMI Keys</h2>
                <p>The section below only works with LUMI Keys by ROLI.</p>
                <div className="eventsLog lumi">
                    <pre>{lumiEventsLog}</pre>
                </div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_GetSerialNumber()}>Serial Number</button>
                    <br />
                    <button onClick={LUMIKeys.getClickHandler_ResetToFactorySettings()}>Factory Reset</button>
                    <br />
                    <button onClick={LUMIKeys.getClickHandler_PingDevice()}>Ping Device</button>
                    <br />
                    <button onClick={LUMIKeys.runCommand_001}>Run Test Command 001</button>
                    <button onClick={LUMIKeys.runCommand_002}>Run Test Command 002</button>
                </div>
                <br />
                <div>
                    <div>Light Up Note</div>
                    <div className="blackKeys">
                        <Spacer30px />
                        <button onClick={LUMIKeys.getClickHandler_Highlight("C#3")}>
                            C#3
                            <br />
                            Db3
                        </button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("D#3")}>
                            D#3
                            <br />
                            Eb3
                        </button>
                        <Spacer60px />
                        <button onClick={LUMIKeys.getClickHandler_Highlight("F#3")}>
                            F#3
                            <br />
                            Gb3
                        </button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("G#3")}>
                            G#3
                            <br />
                            Ab3
                        </button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("A#3")}>
                            A#3
                            <br />
                            Bb3
                        </button>
                        <Spacer60px />
                        <Spacer30px />
                        <button onClick={LUMIKeys.getClickHandler_Highlight("C#4")}>
                            C#4
                            <br />
                            Db4
                        </button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("D#4")}>
                            D#4
                            <br />
                            Eb4
                        </button>
                        <Spacer60px />
                        <button onClick={LUMIKeys.getClickHandler_Highlight("F#4")}>
                            F#4
                            <br />
                            Gb4
                        </button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("G#4")}>
                            G#4
                            <br />
                            Ab4
                        </button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("A#4")}>
                            A#4
                            <br />
                            Bb4
                        </button>
                    </div>
                    <div className="whiteKeys">
                        <button onClick={LUMIKeys.getClickHandler_Highlight("C3")}>C3</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("D3")}>D3</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("E3")}>E3</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("F3")}>F3</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("G3")}>G3</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("A3")}>A3</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("B3")}>B3</button>
                        <Spacer30px />
                        <button onClick={LUMIKeys.getClickHandler_Highlight("C4")}>C4</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("D4")}>D4</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("E4")}>E4</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("F4")}>F4</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("G4")}>G4</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("A4")}>A4</button>
                        <button onClick={LUMIKeys.getClickHandler_Highlight("B4")}>B4</button>
                    </div>
                </div>
                <br />
                <div>
                    <div>Scale Root</div>
                    <div>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("C")}>C</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("C#")}>C#/Db</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("D")}>D</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("D#")}>D#/Eb</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("E")}>E</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("F")}>F</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("F#")}>F#/Gb</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("G")}>G</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("G#")}>G#/Ab</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("A")}>A</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("A#")}>A#/Bb</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("B")}>B</button>
                    </div>
                </div>
                <br />
                <div>
                    <div>Scale Type</div>
                    <div>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("major")}>major</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("minor")}>minor</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("harmonic-minor")}>harmonic minor</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("pentatonic-major")}>major pentatonic</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("pentatonic-minor")}>minor pentatonic</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("blues")}>blues</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("dorian")}>dorian</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("phrygian")}>phrygian</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("lydian")}>lydian</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("mixolydian")}>mixolydian</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("locrian")}>locrian</button>
                    </div>
                    <div>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("chromatic")}>chromatic</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("whole-tone")}>whole-tone</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("arabic-a")}>arabic-a</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("arabic-b")}>arabic-b</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("japanese")}>japanese</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("ryukyu")}>ryukyu</button>
                        <button onClick={LUMIKeys.getClickHandler_SetScaleType("8-tone-spanish")}>8-tone-spanish</button>
                    </div>
                </div>
                <br />
                <div className="dt" style={{ border: "10px solid #000" }}>
                    <div className="dtHead">
                        <div className="dtCell">
                            <a onClick={LUMIKeys.getClickHandler_SwitchToMode(1)}>Mode 1</a>
                        </div>
                        <div className="dtCell">
                            <a onClick={LUMIKeys.getClickHandler_SwitchToMode(2)}>Mode 2</a>
                        </div>
                        <div className="dtCell">
                            <a onClick={LUMIKeys.getClickHandler_SwitchToMode(3)}>Mode 3</a>
                        </div>
                        <div className="dtCell">
                            <a onClick={LUMIKeys.getClickHandler_SwitchToMode(4)}>Mode 4</a>
                        </div>
                    </div>
                    <div className="dtBody">
                        <div className="dtRow">
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "pro")}>pro</button>
                                <div className="dtCellNote">highlight root note with single rainbow color</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "pro")}>pro</button>
                                <div className="dtCellNote">highlight root note with single rainbow color</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "pro")}>pro</button>
                                <div className="dtCellNote">highlight root note with single rainbow color</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "pro")}>pro</button>
                                <div className="dtCellNote">highlight root note with single rainbow color</div>
                            </div>
                        </div>
                        <div className="dtRow">
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "user")}>user</button>
                                <div className="dtCellNote">highlight root note with user selected color</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "user")}>user</button>
                                <div className="dtCellNote">highlight root note with user selected color</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "user")}>user</button>
                                <div className="dtCellNote">highlight root note with user selected color</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "user")}>user</button>
                                <div className="dtCellNote">highlight root note with user selected color</div>
                            </div>
                        </div>
                        <div className="dtRow">
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "piano")}>piano</button>
                                <div className="dtCellNote">white and black keys</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "piano")}>piano</button>
                                <div className="dtCellNote">white and black keys</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "piano")}>piano</button>
                                <div className="dtCellNote">white and black keys</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "piano")}>piano</button>
                                <div className="dtCellNote">white and black keys</div>
                            </div>
                        </div>
                        <div className="dtRow">
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "stage")}>stage</button>
                                <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "stage")}>stage</button>
                                <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "stage")}>stage</button>
                                <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "stage")}>stage</button>
                                <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                            </div>
                        </div>
                        <div className="dtRow">
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "rainbow")}>rainbow</button>
                                <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "rainbow")}>rainbow</button>
                                <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "rainbow")}>rainbow</button>
                                <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                            </div>
                            <div className="dtCell">
                                <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "rainbow")}>rainbow</button>
                                <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                            </div>
                        </div>
                        <div className="dtRow">
                            <div className="dtCell">
                                <div className="dtCellNote">pitch bend</div>
                                <button onClick={LUMIKeys.getClickHandler_PitchBend(1, true)}>on</button> <button onClick={LUMIKeys.getClickHandler_PitchBend(1, false)}>off</button>
                            </div>
                            <div className="dtCell">
                                <div className="dtCellNote">pitch bend</div>
                                <button onClick={LUMIKeys.getClickHandler_PitchBend(2, true)}>on</button> <button onClick={LUMIKeys.getClickHandler_PitchBend(2, false)}>off</button>
                            </div>
                            <div className="dtCell">
                                <div className="dtCellNote">pitch bend</div>
                                <button onClick={LUMIKeys.getClickHandler_PitchBend(3, true)}>on</button> <button onClick={LUMIKeys.getClickHandler_PitchBend(3, false)}>off</button>
                            </div>
                            <div className="dtCell">
                                <div className="dtCellNote">pitch bend</div>
                                <button onClick={LUMIKeys.getClickHandler_PitchBend(4, true)}>on</button> <button onClick={LUMIKeys.getClickHandler_PitchBend(4, false)}>off</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <UserColorsPanel />
                <br />
                <SetOctaveAndBrightnessPanel />
                <br />
                <div>
                    <label>
                        Paste this in Chrome's address bar to view MIDI site settings:
                        <br />
                        <input
                            type="text"
                            value="chrome://settings/content/midiDevices"
                            size={37}
                            onClick={(e) => {
                                const inputElement = e.target as HTMLInputElement;
                                inputElement.setSelectionRange(0, inputElement.value.length);
                            }}
                            readOnly
                        />
                    </label>
                </div>
                <br />
                <br />
                <br />
                {/* <div>
                    <button onClick={LUMIKeys.startFakeDevice}>PRETEND TO BE LUMI (doesn't work!)</button>
                </div> */}
            </div>
            <style jsx global>{`
                .eventsLog {
                    border: 1px solid #000;
                    background-color: #111;
                    height: 300px;
                    overflow: auto;
                    font-size: 12px;
                    padding: 10px 24px;
                }

                .devicesSectionLayout {
                    display: flex;
                }

                .eventsLog.midi {
                    flex: 6;
                    margin-right: 10px;
                }

                .deviceList {
                    border: 1px solid #000;
                    background-color: #181818;
                    height: 300px;
                    overflow: auto;
                    font-size: 12px;
                    padding: 10px 24px;
                    margin-left: 10px;
                    flex: 4;
                }

                pre {
                    font-family: Hack, Menlo, Consolas, Courier, monospace;
                    line-height: 180%;
                }
                .dt {
                    display: table;
                    width: 100%;
                }
                .dtHead {
                    display: table-header-group;
                    background-color: #333;
                }
                .dtBody {
                    display: table-row-group;
                }
                .dtRow {
                    display: table-row;
                }
                .dtCell {
                    border: 1px solid #999999;
                    display: table-cell;
                    padding: 3px 10px;
                }
                .dtCell a {
                    cursor: pointer;
                    text-decoration: underline;
                }
                .dtCell button {
                    width: 100%;
                }
                .dtCellNote {
                    font-size: 11px;
                    line-height: 100%;
                }
                .blackKeys button {
                    background-color: #333;
                    color: #ddd;
                    width: 60px;
                    height: 50px;
                }
                .whiteKeys button {
                    width: 60px;
                    height: 60px;
                }

                .colorSwatch {
                    border: 1px solid gray;
                    width: 40px;
                    height: 40px;
                    display: inline-block;
                    cursor: pointer;
                }

                .colorHexInput label {
                    font-size: 12pt;
                }
            `}</style>
        </>
    );
};

export async function getStaticProps(context) {
    return {
        props: {
            title: "MIDI Tests",
        },
    };
}

export default Page;
