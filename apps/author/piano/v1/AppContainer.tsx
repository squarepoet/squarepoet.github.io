import SharpsAndFlats, { SharpsAndFlatsInterface } from "apps/author/piano/shared/SharpsAndFlats";
import SharpsAndFlatsManager from "apps/author/piano/shared/SharpsAndFlatsManager";
import PianoAuthorV1 from "apps/author/piano/v1/App";
import KeyboardShortcuts from "apps/author/piano/v1/KeyboardShortcuts";
import NotesAndPiano from "apps/author/piano/v1/NotesAndPiano";
import ClearBoth from "components/ClearBoth";
import PreloadDialog from "components/dialogs/Preload";
import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "use-hooks";

const Page = () => {
    const canvasRef = useRef(null);

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e: KeyboardEvent) => {
            // If we are typing in the sharps/flats input box, we should not pass the event to our app.
            // Let the SharpsAndFlats component handle the update of our sharps / flats.
            if (SharpsAndFlatsManager.isFocusedOnInputs()) {
                return;
            }

            PianoAuthorV1.onKeydown(e);
        });
    }

    const sharpsAndFlatsInput = useRef<SharpsAndFlatsInterface>();

    useEffect(() => {
        SharpsAndFlatsManager.setRef(sharpsAndFlatsInput);
        PianoAuthorV1.startUI(canvasRef);
        PianoAuthorV1.startAudio();
    }, []);

    return (
        <>
            <div>
                <KeyboardShortcuts />
                <SharpsAndFlats ref={sharpsAndFlatsInput} localStorageKeyPrefix="piano" style={{ float: "left" }} />
                <ClearBoth />
                <br />
                <NotesAndPiano canvasRef={canvasRef} />
            </div>
        </>
    );
};

export default Page;
