// Do some more tests with Tone.js here.
//

import React, { useEffect, useState } from "react";

var inst;

const Page = () => {
    function onClickPlaySomething(e) {
        console.log("Play Something");
    }

    useEffect(() => {
        // One Time
    }, []);

    return (
        <div>
            <h1>Tone JS Demo</h1>
            <button onClick={onClickPlaySomething}>Play Something</button>
        </div>
    );
};

export default Page;
