import App from "apps/midi/App";
import BlackKeys from "apps/midi/BlackKeys";
import ComputerKeyboardInputElement from "apps/midi/ComputerKeyboardInputElement";
import ModeCustomization from "apps/midi/ModeCustomization";
import SetOctaveAndBrightness from "apps/midi/SetOctaveAndBrightness";
import SetScaleRoot from "apps/midi/SetScaleRoot";
import SetScaleType from "apps/midi/SetScaleType";
import UserColors from "apps/midi/UserColors";
import WhiteKeys from "apps/midi/WhiteKeys";
import LUMIKeys from "apps/shared/midi/LUMIKeys";
import { InstrumentType } from "apps/shared/sound/Instrument";
import ClearBoth from "components/ClearBoth";
import React, { useEffect, useState } from "react";

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

const AppContainer = () => {
    const classes = useStyles();

    const [deviceList, setDeviceList] = useState("Looking for MIDI Devices...");
    const [midiEventsLog, setMIDIEventsLog] = useState("");
    const [lumiEventsLog, setLUMIEventsLog] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState(InstrumentType.SynthBasic); // Which Tone.js/Musical.js instrument should we use?

    useEffect(() => {
        App.setHandlers({
            setDeviceList,
            setMIDIEventsLog,
            setLUMIEventsLog,
            setSelectedInstrument,
        });
        App.addOnBlurHandlerToWindow(window);
        App.start();
    }, []);

    return (
        <>
            <div>
                <h1>MIDI Test Page</h1>
                <FormControl className={classes.form}>
                    <InputLabel id="select-instrument-label" className={classes.label}>
                        Instrument Sound
                    </InputLabel>
                    <Select labelId="select-instrument-label" value={selectedInstrument} id="select-instrument" onChange={App.onSelectInstrumentChange} label="Instrument" className={classes.select}>
                        <MenuItem value={InstrumentType.Sampled_1}>Sound 1</MenuItem>
                        <MenuItem value={InstrumentType.Sampled_2}>Sound 2</MenuItem>
                        <MenuItem value={InstrumentType.SynthMusicalJS}>Sound 3</MenuItem>
                        <MenuItem value={InstrumentType.SynthFatSawtooth}>Sound 4</MenuItem>
                        <MenuItem value={InstrumentType.SynthFM}>Sound 5</MenuItem>
                        <MenuItem value={InstrumentType.SynthAM}>Sound 6</MenuItem>
                        <MenuItem value={InstrumentType.SynthBasic}>Sound 7</MenuItem>
                        <MenuItem value={InstrumentType.SynthTest1}>Test 1</MenuItem>
                        <MenuItem value={InstrumentType.SynthTest2}>Test 2</MenuItem>
                        <MenuItem value={InstrumentType.SynthTest3}>Test 3</MenuItem>
                    </Select>
                </FormControl>
                <ClearBoth />
                <h2>Input Devices</h2>
                <div className="devicesSectionLayout">
                    <div className="eventsLog midi">
                        <pre>{midiEventsLog}</pre>
                    </div>
                    <div className="deviceList">
                        <pre>{deviceList}</pre>
                    </div>
                </div>
                <ComputerKeyboardInputElement />
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
                    <BlackKeys />
                    <WhiteKeys />
                </div>
                <br />
                <SetScaleRoot />
                <br />
                <SetScaleType />
                <br />
                <ModeCustomization />
                <br />
                <UserColors />
                <br />
                <SetOctaveAndBrightness />
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
                    margin-right: 100px;
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

                .computerKeyboardInput {
                    width: 80%;
                    height: 40px;
                    margin: 20px auto;
                    padding: 10px 20px;
                    background-color: #333;
                    border: none;
                    color: #dd7;
                    font-family: Hack, Menlo, Consolas, Courier, monospace;
                }
            `}</style>
        </>
    );
};
export default AppContainer;
