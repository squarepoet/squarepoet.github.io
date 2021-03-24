// Do some tests with Tone.js here.

import SimplePiano from "components/piano/SimplePiano";
import React, { useEffect, useState } from "react";

// TODO
// - Click a button to run the test
//
// + Play a melody
// + Play a polysynth
// + Any other features I learn...

const Page = () => {
    return (
        <div>
            <h1>A Simple Piano Component</h1>
            <SimplePiano />
        </div>
    );
};

export default Page;
