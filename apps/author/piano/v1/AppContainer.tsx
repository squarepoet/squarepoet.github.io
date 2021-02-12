import SharpsAndFlats, { SharpsAndFlatsInterface } from "apps/author/piano/shared/SharpsAndFlats";
import SharpsAndFlatsManager from "apps/author/piano/shared/SharpsAndFlatsManager";
import PianoAuthorV1 from "apps/author/piano/v1/App";
import KeyboardShortcuts from "apps/author/piano/v1/KeyboardShortcuts";
import NotesAndPiano from "apps/author/piano/v1/NotesAndPiano";
import PreloadDialog from "components/dialogs/Preload";
import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "use-hooks";

const Page = () => {
    const canvasRef = useRef(null);
    const [showPreloadDialog, setShowPreloadDialog] = useState(true);

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {
            PianoAuthorV1.keydown(e);
        });
        useEventListener("keyup", (e) => {
            PianoAuthorV1.keyup(e);
        });
    }

    function startAudio() {
        PianoAuthorV1.startAudio();
        setShowPreloadDialog(false);
    }

    const sharpsAndFlatsInput = useRef<SharpsAndFlatsInterface>();

    useEffect(() => {
        SharpsAndFlatsManager.setRef(sharpsAndFlatsInput);
        PianoAuthorV1.startUI(canvasRef);
    }, []);

    return (
        <>
            {showPreloadDialog ? <PreloadDialog initialOpenState={showPreloadDialog} preloadNow={startAudio} /> : null}
            <div>
                <KeyboardShortcuts />
                <SharpsAndFlats ref={sharpsAndFlatsInput} style={{ float: "left" }} />
                <div>
                    <style jsx>{`
                        div {
                            clear: both;
                        }
                    `}</style>
                </div>
                <br />
                <NotesAndPiano canvasRef={canvasRef} />
            </div>
        </>
    );
};

export default Page;
