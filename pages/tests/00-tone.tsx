// Test Tone.js

import React, { useEffect } from "react";

const Page = () => {
    function onClickConnectToDestination1(e) {}
    function onClickConnectToDestination2(e) {}
    function onClickCheckToneDestination(e) {}
    function onClickDisconnect(e) {}

    useEffect(() => {
        // One Time
    }, []);

    return (
        <div>
            <h1>Tone JS Demo</h1>
            <button onClick={onClickConnectToDestination1}>Play a FM Synth</button>
            <button onClick={onClickConnectToDestination2}>Play a AM Synth</button>
            <button onClick={onClickCheckToneDestination}>Print Debug Info to Console</button>
            <button onClick={onClickDisconnect}>Reset the Destination</button>
        </div>
    );
};

export default Page;
