import React, { useEffect, useState } from "react";
import { useEventListener } from "use-hooks";

let worker;
let preloader;

function onPianoClockWorkerMessage(e) {
    // console.log(new Date().getTime());
}

export default () => {
    if (typeof window !== "undefined") {
        useEventListener("keydown", (e: KeyboardEvent) => {
            if (e.keyCode == 32) {
                // SPACE
            } else if (e.keyCode == 70) {
                // F
            } else if (e.keyCode == 68) {
                // D
            } else {
                console.log(e.keyCode);
            }
        });
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
