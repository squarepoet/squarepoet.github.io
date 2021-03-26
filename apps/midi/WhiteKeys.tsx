import LUMIKeys from "apps/shared/midi/LUMIKeys";
import { Spacer30px } from "components/Spacer";
import React from "react";

const WhiteKeys = () => {
    const noteNames = ["C", "D", "E", "F", "G", "A", "B"];
    const lowerOctave = noteNames.map((noteName) => {
        const noteNameAndOctave = noteName + "3";
        return (
            <button key={noteNameAndOctave} onClick={LUMIKeys.getClickHandler_Highlight(noteNameAndOctave)}>
                {noteNameAndOctave}
            </button>
        );
    });

    const upperOctave = noteNames.map((noteName) => {
        const noteNameAndOctave = noteName + "4";
        return (
            <button key={noteNameAndOctave} onClick={LUMIKeys.getClickHandler_Highlight(noteNameAndOctave)}>
                {noteNameAndOctave}
            </button>
        );
    });

    return (
        <>
            <div className="whiteKeys">
                {lowerOctave}
                <Spacer30px />
                {upperOctave}
            </div>
        </>
    );
};

export default WhiteKeys;
