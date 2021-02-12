import GuitarAuthorV1 from "apps/author/guitar/v1/App";
import Shortcuts from "apps/author/guitar/v1/Shortcuts";
import InputSaved, { InputSavedInterface } from "components/InputSaved";
import { useEffect, useRef } from "react";
import { useEventListener } from "use-hooks";
import createPersistedState from "use-persisted-state";

const useGuitarTabState = createPersistedState("guitar_tab");

let app: GuitarAuthorV1 = null;

if (typeof window !== "undefined") {
    app = new GuitarAuthorV1();
}

const Page = () => {
    const [guitarTab, setGuitarTab] = useGuitarTabState("");

    const guitarTabTextArea = useRef();
    const guitarCanvas = useRef();

    const sharpsInput = useRef<InputSavedInterface>();
    const flatsInput = useRef<InputSavedInterface>();
    const isFocusedOnSharpsInput = () => {
        return sharpsInput.current.hasFocus();
    };
    const isFocusedOnFlatsInput = () => {
        return flatsInput.current.hasFocus();
    };

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {
            if (isFocusedOnSharpsInput() || isFocusedOnFlatsInput()) {
                return; // If the user is typing in the sharps/flats input, we not forward the onKeyDown to the app.
            } else {
                app.onKeyDown(e);
            }
        });
    }

    // #TODO: Consider using useLayoutEffect if any of the ref.current values are null!
    useEffect(() => {
        app.setGuitarTab = setGuitarTab;
        app.isNoteSharp = (noteLabel: string): boolean => {
            const sharps = sharpsInput.current.getValue();
            // Case insensitive test. Does the list of sharps contain the noteLabel?
            return new RegExp(noteLabel, "i").test(sharps);
        };

        app.isNoteFlat = (noteLabel: string): boolean => {
            const flats = flatsInput.current.getValue();
            // Case insensitive test. Does the list of flats contain the noteLabel?
            return new RegExp(noteLabel, "i").test(flats);
        };
        app.getGuitarTab = () => {
            return guitarTab;
        };
        app.getGuitarTabTextArea = () => {
            return guitarTabTextArea.current;
        };
        app.getGuitarCanvas = () => {
            return guitarCanvas.current;
        };
        app.loadNoteGroupsFromGuitarTab(guitarTab);
        app.drawFrets();
    }, []);

    return (
        <>
            <Shortcuts />
            <div className="sharps-and-flats">
                <InputSaved ref={sharpsInput} label="sharps" persistedStateKey="guitar_sharps" />
                <InputSaved ref={flatsInput} label="flats" persistedStateKey="guitar_flats" />
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
            `}</style>
        </>
    );
};
export default Page;
