// Do some tests with Musical.js here.

import Musical from "apps/shared/musical/Musical";
import React, { useEffect, useState } from "react";

var inst;

const Page = () => {
    useEffect(() => {
        // One Time
    }, []);

    function onClickStartMusicalJS() {
        inst = new Musical.Instrument("piano");
    }
    function onClickPlaySomething() {
        inst.tone("C");
        inst.tone("E");
        inst.tone("G");
    }

    return (
        <div>
            <h1>Piano Demo #2 – Musical JS</h1>
            <button onClick={onClickStartMusicalJS}>START MUSICAL.JS</button>
            <br></br>
            <button onClick={onClickPlaySomething}>Play Something</button>
        </div>
    );
};

export default Page;
