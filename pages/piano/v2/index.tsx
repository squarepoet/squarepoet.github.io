import React, { useEffect, useState } from "react";
import { useEventListener } from "use-hooks";

let worker;

function onPianoClockWorkerMessage(e) {
    // console.log(new Date().getTime());
}

export default () => {
    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {});
        useEventListener("keyup", (e) => {});
    }

    useEffect(() => {
        worker = new Worker("/s/j/piano/v2/clock.worker.js");
        worker.postMessage("start");
        worker.addEventListener("message", onPianoClockWorkerMessage);
    }, []);

    return <></>;
};

export async function getStaticProps(context) {
    return {
        props: {
            title: "Piano Author V2",
        },
    };
}
