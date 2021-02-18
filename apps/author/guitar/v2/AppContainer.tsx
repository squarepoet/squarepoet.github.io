import FretCanvasContainer from "apps/author/guitar/shared/FretCanvasContainer";
import Shortcuts from "apps/author/guitar/shared/Shortcuts";
import App from "apps/author/guitar/v2/App";
import SharpsAndFlats from "apps/author/piano/shared/SharpsAndFlats";
import Constants from "apps/shared/Constants";
import ClearBoth from "components/ClearBoth";
import React, { useEffect, useRef, useState } from "react";

import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

// Consider: https://material-ui.com/styles/basics/

const AppContainer = () => {
    const sharpsAndFlatsInput = useRef();
    const [instrumentType, setInstrumentType] = useState(Constants.Instrument.GUITAR);
    const [numStrings, setNumStrings] = useState(6);

    useEffect(() => {
        App.setHooks({
            setInstrumentType: setInstrumentType,
            setNumStrings: setNumStrings,
        });
        App.loadFromLocalStorage();
    }, []);

    const onInstrumentChange = (e) => {
        App.setInstrumentType(e.target.value);
    };

    return (
        <>
            <SharpsAndFlats ref={sharpsAndFlatsInput} localStorageKeyPrefix="guitar" style={{ float: "left" }} />
            <Shortcuts />
            <RadioGroup row aria-label="instrument" name="instrument" defaultValue={Constants.Instrument.GUITAR} style={{ float: "right" }} onChange={onInstrumentChange}>
                <FormControlLabel value={Constants.Instrument.GUITAR} control={<Radio />} label="Guitar" labelPlacement="top" />
                <FormControlLabel value={Constants.Instrument.UKULELE_HIGH_G} control={<Radio />} label="Ukulele" labelPlacement="top" />
                <FormControlLabel value={Constants.Instrument.UKULELE_LOW_G} control={<Radio />} label="Uke (Low G)" labelPlacement="top" />
            </RadioGroup>
            <ClearBoth />
            <FretCanvasContainer numStrings={numStrings} />
        </>
    );
};

export default AppContainer;
