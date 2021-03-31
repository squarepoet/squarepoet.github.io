// #TODO: Support changing of instruments via button clicks.
import Instrument, { InstrumentType } from "apps/shared/sound/Instrument";
import React, { useEffect } from "react";

let piano: Instrument;

const Page = () => {
    useEffect(() => {
        // MOUNT
        piano = new Instrument(InstrumentType.SynthBasic);

        setTimeout(() => {
            onClick_Play_CMajor();
        }, 5000);
    }, []);

    function onClick_CreateInstrument() {
        // piano = new Instrument(InstrumentType.SynthBasic);
        piano = new Instrument(InstrumentType.SynthMusicalJS);
    }

    function onClick_Play_CMajor() {
        if (!piano) return;
        piano.play(40); // C
        piano.play(44); // E
        piano.play(47); // G
    }

    function onClick_Stop_CMajor() {
        if (!piano) return;
        piano.stop(40);
        piano.stop(44);
        piano.stop(47);
    }

    function onClick_StopAll() {
        if (!piano) return;
        piano.silence();
    }

    function onClick_AddWindowBlurHandler() {
        window.addEventListener("blur", () => {
            if (!piano) return;
            piano.silence();
        });
    }

    return (
        <div>
            <h1>Instrument Wrapper</h1>
            <button onClick={onClick_CreateInstrument}>Create Instrument</button>
            <br></br>
            <button onClick={onClick_Play_CMajor}>Play C Major</button>
            <button onClick={onClick_Stop_CMajor}>Stop C Major</button>
            <br></br>
            <button onClick={onClick_StopAll}>Stop All Sounds</button>
            <br></br>
            <button onClick={onClick_AddWindowBlurHandler}>Add window.onblur to stop sounds</button>
            <br></br>
        </div>
    );
};

export default Page;
