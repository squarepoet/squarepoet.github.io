import GuitarAuthorV1 from "apps/author/guitar/app";
import Shortcuts from "apps/author/guitar/Shortcuts";
import InputSaved from "components/input-saved";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "use-hooks";
import createPersistedState from "use-persisted-state";

// SERVER + CLIENT
console.log("index.tsx loaded!");

const useGuitarTabState = createPersistedState("guitar_tab");

let authoringTool: GuitarAuthorV1 = null;

if (typeof window !== "undefined") {
    authoringTool = new GuitarAuthorV1();
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
            authoringTool.onKeyDown(e);
        });
    }

    // Called Every Render
    useEffect(() => {
        console.log("USE EFFECT");
        authoringTool.setGuitarTab = setGuitarTab;
        authoringTool.getSharps = () => {
            return "";
            // return sharps.toLowerCase();
        };
        authoringTool.getFlats = () => {
            return "";
            // return flats.toLowerCase();
        };
        authoringTool.getGuitarTab = () => {
            return guitarTab;
        };
        authoringTool.getGuitarTabTextArea = () => {
            return guitarTabTextArea.current;
        };
        authoringTool.getSharpsInput = () => {
            return null;
            // return sharpsInput.current;
        };
        authoringTool.getFlatsInput = () => {
            return null;
            // return flatsInput.current;
        };
        authoringTool.getGuitarCanvas = () => {
            return guitarCanvas.current;
        };
    });

    // Called Once!
    useEffect(() => {
        console.log("USE EFFECT ON MOUNT");
        authoringTool.loadNoteGroupsFromGuitarTab(guitarTab);
        authoringTool.drawFrets();
    }, []);

    return (
        <>
            {/* <script type="text/javascript" src="/s/j/musical.patched.js"></script> */}
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
