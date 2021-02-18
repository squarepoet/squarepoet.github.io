import FretCanvasContainer from "apps/author/guitar/shared/FretCanvasContainer";
import Shortcuts from "apps/author/guitar/shared/Shortcuts";
import App from "apps/author/guitar/v2/App";
import SharpsAndFlats, { SharpsAndFlatsInterface } from "apps/author/piano/shared/SharpsAndFlats";
import SharpsAndFlatsManager from "apps/author/piano/shared/SharpsAndFlatsManager";
import Constants from "apps/shared/Constants";
import ClearBoth from "components/ClearBoth";
import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "use-hooks";

import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

// Consider: https://material-ui.com/styles/basics/

// #TODO: Switch from RadioGroup to ToggleButtonGroup once Material UI 5.0 is released!

const AppContainer = () => {
    const sharpsAndFlatsInput = useRef<SharpsAndFlatsInterface>();
    const [instrumentType, setInstrumentType] = useState(Constants.Instrument.GUITAR);
    const [numStrings, setNumStrings] = useState(6);
    const [computerKeyboardFretOffset, setComputerKeyboardFretOffset] = useState(0);
    const [computerKeyboardStringOffset, setComputerKeyboardStringOffset] = useState(0);

    useEffect(() => {
        SharpsAndFlatsManager.setRef(sharpsAndFlatsInput);
        App.setHooks({
            setInstrumentType: setInstrumentType,
            setNumStrings: setNumStrings,
            setComputerKeyboardFretOffset: setComputerKeyboardFretOffset,
            setComputerKeyboardStringOffset: setComputerKeyboardStringOffset,
        });
        App.loadFromLocalStorage();
    }, []);

    if (typeof window !== "undefined") {
        // e.key vs e.code
        // @     vs Digit2
        // Shift vs ShiftRight
        //
        // e.key is what the user intends to type and what will appear on screen (unless it's Shift|Control|Meta|Alt).
        // e.code is the physical key that the user pressed.
        useEventListener("keydown", (e: KeyboardEvent) => {
            // If we are typing in the sharps/flats input box, we should not pass the event to our app.
            // Let the SharpsAndFlats component handle the update of our sharps / flats.
            if (SharpsAndFlatsManager.isFocusedOnInputs()) {
                return;
            }

            App.onKeyDown(e);
        });
    }

    // #TODO: Extract RadioGroup code into its own component file!
    const onRadioGroupValueChange = (e) => {
        App.setInstrumentType(e.target.value);
    };

    const onRadioGroupMouseUp = (e) => {
        // Prevent the RadioGroup from capturing our keyboard input when we click the Radio buttons.
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const onRadioGroupKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // ESC to remove focus from this element.
        // ENTER to "commit" the change and also remove focus from this element.
        if (e.code === "Escape" || e.code === "Enter") {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    };

    return (
        <>
            <SharpsAndFlats ref={sharpsAndFlatsInput} localStorageKeyPrefix="guitar" style={{ float: "left" }} />
            <Shortcuts />
            <RadioGroup row name="instrument" defaultValue={Constants.Instrument.GUITAR} style={{ float: "right" }} onChange={onRadioGroupValueChange} onMouseUp={onRadioGroupMouseUp} onKeyUp={onRadioGroupKeyUp}>
                <FormControlLabel value={Constants.Instrument.GUITAR} control={<Radio />} label="Guitar" labelPlacement="top" />
                <FormControlLabel value={Constants.Instrument.UKULELE_HIGH_G} control={<Radio />} label="Ukulele" labelPlacement="top" />
                <FormControlLabel value={Constants.Instrument.UKULELE_LOW_G} control={<Radio />} label="Uke (Low G)" labelPlacement="top" />
            </RadioGroup>
            <ClearBoth />
            <FretCanvasContainer instrumentType={instrumentType} numStrings={numStrings} computerKeyboardFretOffset={computerKeyboardFretOffset} computerKeyboardStringOffset={computerKeyboardStringOffset} />
        </>
    );
};

export default AppContainer;
