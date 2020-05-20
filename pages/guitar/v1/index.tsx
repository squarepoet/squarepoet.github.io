import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import GuitarAuthorV1 from "apps/author/guitar/GuitarAuthorV1";
import createPersistedState from "use-persisted-state";
import useEventListener from "hooks/useEventListener";

console.log("index.tsx loaded!");

const useGuitarTabState = createPersistedState("guitar_tab");
const useSharpsState = createPersistedState("sharps");
const useFlatsState = createPersistedState("flats");

let authoringTool: GuitarAuthorV1 = null;

if (typeof window !== "undefined") {
    authoringTool = new GuitarAuthorV1();
}

// This function is called each time we need to update the page.
export default function () {
    console.log("Page Function Called");

    const [sharps, setSharps] = useSharpsState("");
    const [flats, setFlats] = useFlatsState("");
    const [guitarTab, setGuitarTab] = useGuitarTabState("");

    const guitarTabTextArea = useRef();
    const sharpsInput = useRef();
    const flatsInput = useRef();
    const guitarCanvas = useRef();

    useEventListener("keydown", (e) => {
        if (authoringTool) {
            authoringTool.onKeyDown(e);
        }
    });

    useEventListener("keyup", (e) => {
        if (authoringTool) {
            authoringTool.onKeyUp(e);
        }
    });

    useEffect(() => {
        console.log("Rendered! " + Math.random());
        authoringTool.setSharps = setSharps;
        authoringTool.setFlats = setFlats;
        authoringTool.setGuitarTab = setGuitarTab;
        authoringTool.getSharps = () => {
            return sharps.toLowerCase();
        };
        authoringTool.getFlats = () => {
            return flats.toLowerCase();
        };
        authoringTool.getGuitarTab = () => {
            return guitarTab;
        };
        authoringTool.getGuitarTabTextArea = () => {
            return guitarTabTextArea.current;
        };
        authoringTool.getSharpsInput = () => {
            return sharpsInput.current;
        };
        authoringTool.getFlatsInput = () => {
            return flatsInput.current;
        };
        authoringTool.getGuitarCanvas = () => {
            return guitarCanvas.current;
        };
    });

    useEffect(() => {
        authoringTool.loadNoteGroupsFromGuitarTab(guitarTab);
        authoringTool.drawGuitar();
        console.log("Page Mounted!");
    }, []);

    return (
        <>
            <Head>
                <title>Guitar Author V1</title>
                {/* <script type="text/javascript" src="/s/j/lodash.min.js"></script> */}
                <script type="text/javascript" src="/s/j/musical.min.js"></script>
            </Head>
            <div className="hotkeys">
                shift + esc &rarr; clear
                <br />
                cmd + c &rarr; copy <br />
                arrow keys &rarr; adjust
                <br />
                tab &rarr; combine
            </div>
            <div className="sharps-and-flats">
                sharps: <input ref={sharpsInput} value={sharps} readOnly />
                <br />
                flats: <input ref={flatsInput} value={flats} readOnly />
            </div>
            <div className="clear"></div>
            <br />
            <div id="content" className="content">
                <textarea className="textarea" rows={3} cols={80} value={guitarTab} readOnly />
                <canvas ref={guitarCanvas} width="1040" height="280" className="canvas"></canvas>
            </div>
            <style jsx global>{`
                body {
                    margin: 15px 20px;
                }
            `}</style>
            <style jsx>{`
                div.hotkeys {
                    float: right;
                    text-align: right;
                }
                div.sharps-and-flats {
                    margin-right: 40px;
                    float: right;
                    text-align: right;
                }
                div.clear {
                    clear: right;
                }
                div.content {
                    width: 100%;
                    text-align: center;
                }
                .textarea {
                    font-family: Inconsolata, Menlo, Monaco, Courier, monospace;
                    font-size: 16pt;
                    width: 100%;
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
                }
            `}</style>
        </>
    );
}
