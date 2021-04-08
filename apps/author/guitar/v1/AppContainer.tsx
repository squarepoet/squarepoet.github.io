import Shortcuts from "apps/author/guitar/shared/Shortcuts";
import GuitarAuthorV1 from "apps/author/guitar/v1/App";
import SharpsAndFlats, { SharpsAndFlatsInterface } from "apps/author/piano/shared/SharpsAndFlats";
import SharpsAndFlatsManager from "apps/author/piano/shared/SharpsAndFlatsManager";
import Constants from "apps/shared/Constants";
import StorageUtils from "apps/shared/StorageUtils";
import ClearBoth from "components/ClearBoth";
import React, { useEffect, useRef, useState } from "react";
import store from "store2";
import { useEventListener } from "use-hooks";

let app: GuitarAuthorV1 = null;

if (typeof window !== "undefined") {
    app = new GuitarAuthorV1();
}

const Page = () => {
    // Add a localStorage layer to useState so we can store and retrieve values between sessions.
    // #TODO: It's not loading into the default text area.
    const [getStoredTab, setStoredTab] = StorageUtils.storageHandlersForKey(Constants.StoreKeys.GUITAR_TAB, "");
    const setAndStoreTab = (tab: string) => {
        setGuitarTab(tab);
        setStoredTab(tab);
    };
    const [guitarTab, setGuitarTab] = useState(getStoredTab());

    const guitarTabTextArea = useRef();
    const guitarCanvasRef = useRef();

    const sharpsAndFlatsInput = useRef<SharpsAndFlatsInterface>();

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {
            // If we are typing in the sharps/flats input box, we should not pass the event to our app.
            // Let the SharpsAndFlats component handle the update of our sharps / flats.
            if (SharpsAndFlatsManager.isFocusedOnInputs()) {
                return;
            }

            app.onKeyDown(e);
        });
    }

    // #TODO: Consider using useLayoutEffect if any of the ref.current values are null!
    useEffect(() => {
        SharpsAndFlatsManager.setRef(sharpsAndFlatsInput);

        app.setGuitarTab = setAndStoreTab;
        app.getGuitarTab = () => guitarTab;
        app.getGuitarTabTextArea = () => guitarTabTextArea.current;
        app.getGuitarCanvas = () => guitarCanvasRef.current;
        app.loadNoteGroupsFromGuitarTab(guitarTab);
        app.drawFrets();
    }, []);

    return (
        <>
            <Shortcuts />
            <div>
                <SharpsAndFlats ref={sharpsAndFlatsInput} localStorageKeyPrefix="guitar" style={{ float: "left" }} />
            </div>
            <ClearBoth />
            <br />
            <div className="content">
                <textarea ref={guitarTabTextArea} className="textarea" rows={3} cols={80} defaultValue={guitarTab} readOnly />
                <canvas ref={guitarCanvasRef} width="1040" height="280" className="canvas"></canvas>
            </div>
            <style jsx global>{`
                body {
                    margin: 15px 20px;
                }
            `}</style>
            <style jsx>{`
                .content {
                    width: 100%;
                    text-align: center;
                }
                .textarea {
                    font-family: Inconsolata, Menlo, Monaco, Courier, monospace;
                    font-size: 16pt;
                    width: 100%;
                    background-color: #444;
                    color: #ddd;
                }
                .canvas {
                    border: 1px solid rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </>
    );
};

export default Page;
