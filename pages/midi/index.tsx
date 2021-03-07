import LUMIKeys from "apps/shared/midi/LUMIKeys";
import MIDIControllerIO from "apps/shared/midi/MIDIControllerIO";
import Instrument from "apps/shared/sound/Instrument";
import PreloadDialog from "components/dialogs/Preload";
import { Spacer30px, Spacer60px } from "components/Spacer";
import { useEffect, useState } from "react";

const Page = () => {
    const [showPreloadDialog, setShowPreloadDialog] = useState(true);

    if (typeof window !== "undefined") {
        MIDIControllerIO.start();
    }

    useEffect(() => {
        console.log("MOUNT");
    }, []);

    function onDialogDismissedStartAudio() {
        const piano = new Instrument();
        MIDIControllerIO.attachSoundOutput(piano);
        setShowPreloadDialog(false);
    }

    return (
        <div>
            {showPreloadDialog ? <PreloadDialog initialOpenState={showPreloadDialog} preloadNow={onDialogDismissedStartAudio} /> : null}
            <h1>MIDI Test Page</h1>
            <h2>LUMI</h2>
            <div>
                <div>Light Up Note</div>
                <div>
                    <Spacer30px />
                    <button onClick={LUMIKeys.getClickHandler_Highlight("C#3")}>
                        C#3
                        <br />
                        Db3
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("D#3")}>
                        D#3
                        <br />
                        Eb3
                    </button>
                    <Spacer60px />
                    <button onClick={LUMIKeys.getClickHandler_Highlight("F#3")}>
                        F#3
                        <br />
                        Gb3
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("G#3")}>
                        G#3
                        <br />
                        Ab3
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("A#3")}>
                        A#3
                        <br />
                        Bb3
                    </button>
                    <Spacer60px />
                    <Spacer30px />
                    <button onClick={LUMIKeys.getClickHandler_Highlight("C#4")}>
                        C#4
                        <br />
                        Db4
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("D#4")}>
                        D#4
                        <br />
                        Eb4
                    </button>
                    <Spacer60px />
                    <button onClick={LUMIKeys.getClickHandler_Highlight("F#4")}>
                        F#4
                        <br />
                        Gb4
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("G#4")}>
                        G#4
                        <br />
                        Ab4
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("A#4")}>
                        A#4
                        <br />
                        Bb4
                    </button>
                    <style jsx>{`
                        button {
                            background-color: #333;
                            color: #ddd;
                            width: 60px;
                            height: 50px;
                        }
                    `}</style>
                </div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("C3")}>C3</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("D3")}>D3</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("E3")}>E3</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("F3")}>F3</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("G3")}>G3</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("A3")}>A3</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("B3")}>B3</button>
                    <Spacer30px />
                    <button onClick={LUMIKeys.getClickHandler_Highlight("C4")}>C4</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("D4")}>D4</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("E4")}>E4</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("F4")}>F4</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("G4")}>G4</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("A4")}>A4</button>
                    <button onClick={LUMIKeys.getClickHandler_Highlight("B4")}>B4</button>
                    <style jsx>{`
                        button {
                            width: 60px;
                            height: 60px;
                        }
                    `}</style>
                </div>
            </div>
            <br />
            <div>
                <div>Scale Root</div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("C")}>C</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("C#")}>C#/Db</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("D")}>D</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("D#")}>D#/Eb</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("E")}>E</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("F")}>F</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("F#")}>F#/Gb</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("G")}>G</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("G#")}>G#/Ab</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("A")}>A</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("A#")}>A#/Bb</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleRoot("B")}>B</button>
                </div>
            </div>
            <br />
            <div>
                <div>Scale Type</div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("major")}>major</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("minor")}>minor</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("harmonic-minor")}>harmonic minor</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("pentatonic-major")}>major pentatonic</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("pentatonic-minor")}>minor pentatonic</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("blues")}>blues</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("dorian")}>dorian</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("phrygian")}>phrygian</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("lydian")}>lydian</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("mixolydian")}>mixolydian</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("locrian")}>locrian</button>
                </div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("chromatic")}>chromatic</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("whole-tone")}>whole-tone</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("arabic-a")}>arabic-a</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("arabic-b")}>arabic-b</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("japanese")}>japanese</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("ryukyu")}>ryukyu</button>
                    <button onClick={LUMIKeys.getClickHandler_SetScaleType("8-tone-spanish")}>8-tone-spanish</button>
                </div>
            </div>
            <br />
            <div className="dt" style={{ border: "10px solid #000" }}>
                <div className="dtHead">
                    <div className="dtCell">Color Mode 1</div>
                    <div className="dtCell">Color Mode 2</div>
                    <div className="dtCell">Color Mode 3</div>
                    <div className="dtCell">Color Mode 4</div>
                </div>
                <div className="dtBody">
                    <div className="dtRow">
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "pro")}>pro</button>
                            <div className="dtCellNote">highlight root note with single rainbow color</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "pro")}>pro</button>
                            <div className="dtCellNote">highlight root note with single rainbow color</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "pro")}>pro</button>
                            <div className="dtCellNote">highlight root note with single rainbow color</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "pro")}>pro</button>
                            <div className="dtCellNote">highlight root note with single rainbow color</div>
                        </div>
                    </div>
                    <div className="dtRow">
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "user")}>user</button>
                            <div className="dtCellNote">highlight root note with user selected color</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "user")}>user</button>
                            <div className="dtCellNote">highlight root note with user selected color</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "user")}>user</button>
                            <div className="dtCellNote">highlight root note with user selected color</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "user")}>user</button>
                            <div className="dtCellNote">highlight root note with user selected color</div>
                        </div>
                    </div>
                    <div className="dtRow">
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "piano")}>piano</button>
                            <div className="dtCellNote">white and black keys</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "piano")}>piano</button>
                            <div className="dtCellNote">white and black keys</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "piano")}>piano</button>
                            <div className="dtCellNote">white and black keys</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "piano")}>piano</button>
                            <div className="dtCellNote">white and black keys</div>
                        </div>
                    </div>
                    <div className="dtRow">
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "stage")}>stage</button>
                            <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "stage")}>stage</button>
                            <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "stage")}>stage</button>
                            <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "stage")}>stage</button>
                            <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
                        </div>
                    </div>
                    <div className="dtRow">
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(1, "rainbow")}>rainbow</button>
                            <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(2, "rainbow")}>rainbow</button>
                            <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(3, "rainbow")}>rainbow</button>
                            <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                        </div>
                        <div className="dtCell">
                            <button onClick={LUMIKeys.getClickHandler_SetColorMode(4, "rainbow")}>rainbow</button>
                            <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
                        </div>
                    </div>
                </div>
                <style jsx global>{`
                    .dt {
                        display: table;
                        width: 100%;
                    }
                    .dtHead {
                        display: table-header-group;
                        background-color: #333;
                    }
                    .dtBody {
                        display: table-row-group;
                    }
                    .dtRow {
                        display: table-row;
                    }
                    .dtCell {
                        border: 1px solid #999999;
                        display: table-cell;
                        padding: 3px 10px;
                    }
                    .dtCell button {
                        width: 100%;
                    }
                    .dtCellNote {
                        font-size: 11px;
                        line-height: 100%;
                    }
                `}</style>
            </div>
            <br />
            <div>
                <div>User Colors</div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_SetColorGlobalKey()}>Global Key Color</button>
                    <br />
                    <button onClick={LUMIKeys.getClickHandler_SetColorRootKey()}>Root Key Color</button>
                </div>
            </div>
            <br />
            <div>
                <div>Brightness</div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(100)}>100%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(75)}>75%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(50)}>50%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(25)}>25%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(0)}>0%</button>
                </div>
            </div>
            <br />
            <button onClick={LUMIKeys.getClickHandler_GetSerialNumber()}>Serial Number</button>
            <br />
            <button onClick={LUMIKeys.getClickHandler_TestXXX1()}>Unknown Command 1</button>
            <br />
            <button onClick={LUMIKeys.getClickHandler_TestXXX2()}>Unknown Command 2</button>
        </div>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "MIDI Tests",
        },
    };
}

// TEST LUMI KEYS
