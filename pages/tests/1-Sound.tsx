// Do some tests with Tone.js here.

import Instrument, { InstrumentType } from "apps/shared/sound/Instrument";
import React, { useEffect, useState } from "react";

let tone;
let piano;

const Page = () => {
    useEffect(() => {
        // MOUNT
    }, []);

    function onClickStart() {
        piano = new Instrument(InstrumentType.Basic);
    }

    function onClickPlaySomething() {
        // piano.play(40, 1.0); // C
        // piano.play(44, 2.0); // E
        // piano.play(47, 3.0); // G

        piano.play(40); // C
        piano.play(44); // E
        piano.play(47); // G
    }

    function stop() {
        // BUG: STOP seems to only work on Synths.
        // piano.stop(40);
        // piano.stop(44);
        // piano.stop(47);
        piano.stopAllNotes();
    }

    return (
        <div>
            <h1>Piano Demo #1 Tone JS</h1>
            <button onClick={onClickStart}>START TONE.JS</button>
            <br></br>
            <button onClick={onClickPlaySomething}>Play Something</button>
            <br></br>
            <button onClick={stop}>STOP</button>
        </div>
    );
};

export default Page;
