// Do some tests with Tone.js here.

import SimplePiano from "components/piano/SimplePiano";
import React, { useEffect, useState } from "react";

// TODO
// - Click a button to run the test
//
// + Play a melody
// + Play a polysynth
// + Any other features I learn...

export default () => {
    return (
        <div>
            <h1>A Simple Piano Demo #2</h1>
            <SimplePiano />
            <div>That was the demo!</div>
        </div>
    );
};
