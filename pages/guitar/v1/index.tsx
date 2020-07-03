import GuitarAuthorV1 from "apps/author/guitar/v1/App";
import Shortcuts from "apps/author/guitar/v1/Shortcuts";
import InputSaved from "components/InputSaved";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "use-hooks";
import createPersistedState from "use-persisted-state";

// SERVER + CLIENT
console.log("index.tsx loaded!");

const useGuitarTabState = createPersistedState("guitar_tab");

let app: GuitarAuthorV1 = null;

if (typeof window !== "undefined") {
    app = new GuitarAuthorV1();
}

// This function is called each time we need to update the page.
// SERVER + CLIENT
export default function () {
    console.log("Page Function Called");

    const [guitarTab, setGuitarTab] = useGuitarTabState("");

    const guitarTabTextArea = useRef();
    const guitarCanvas = useRef();

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {
            app.onKeyDown(e);
        });
    }

    // Called Every Render
    useEffect(() => {
        console.log("USE EFFECT");
        app.setGuitarTab = setGuitarTab;
        app.getSharps = () => {
            return "";
            // return sharps.toLowerCase();
        };
        app.getFlats = () => {
            return "";
            // return flats.toLowerCase();
        };
        app.getGuitarTab = () => {
            return guitarTab;
        };
        app.getGuitarTabTextArea = () => {
            return guitarTabTextArea.current;
        };
        app.getSharpsInput = () => {
            return null;
            // return sharpsInput.current;
        };
        app.getFlatsInput = () => {
            return null;
            // return flatsInput.current;
        };
        app.getGuitarCanvas = () => {
            return guitarCanvas.current;
        };
    });

    // Called Once!
    useEffect(() => {
        console.log("USE EFFECT ON MOUNT");
        app.loadNoteGroupsFromGuitarTab(guitarTab);
        app.drawFrets();
    }, []);

    return (
        <>
            <Shortcuts />
            <div className="sharps-and-flats">
                sharps: <InputSaved persistedStateKey="sharps" />
                <br />
                flats: <InputSaved persistedStateKey="flats" />
            </div>
            <div className="clear"></div>
            <br />
            <div className="content">
                <textarea ref={guitarTabTextArea} className="textarea" rows={3} cols={80} defaultValue={guitarTab} readOnly />
                <canvas ref={guitarCanvas} width="1040" height="280" className="canvas"></canvas>
            </div>
            <style jsx global>{`
                body {
                    margin: 15px 20px;
                }
            `}</style>
            <style jsx>{`
                .sharps-and-flats {
                    margin-right: 40px;
                    float: left;
                    text-align: right;
                }
                .clear {
                    clear: right;
                }
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

                input {
                    background-color: #444;
                    appearance: none;
                    border: 1px solid #222;
                    padding: 6px;
                    width: 100px;
                    color: #ddd;
                }
            `}</style>
        </>
    );
}

export async function getStaticProps(context) {
    return {
        props: {
            title: "Guitar Author V1",
        },
    };
}
