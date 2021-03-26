import LUMIKeys from "apps/shared/midi/LUMIKeys";
import { Spacer30px, Spacer60px } from "components/Spacer";
import React from "react";

const BlackKeys = () => {
    const CD = ["C#", "D#"];
    const DE = ["Db", "Eb"];
    const FGA = ["F#", "G#", "A#"];
    const GAB = ["Gb", "Ab", "Bb"];

    const generateKeys = (notes1: string[], notes2: string[], octave: number) => {
        return notes1.map((noteName, index) => {
            const noteNameAndOctaveX = noteName + octave;
            const noteNameAndOctaveY = notes2[index] + octave;
            return (
                <button key={noteNameAndOctaveX} onClick={LUMIKeys.getClickHandler_Highlight(noteNameAndOctaveX)}>
                    {noteNameAndOctaveX}
                    <br />
                    {noteNameAndOctaveY}
                </button>
            );
        });
    };

    const lowerCDSharps = generateKeys(CD, DE, 3);
    const upperCDSharps = generateKeys(CD, DE, 4);
    const lowerFGASharps = generateKeys(FGA, GAB, 3);
    const upperFGASharps = generateKeys(FGA, GAB, 4);

    return (
        <>
            <div className="blackKeys">
                <Spacer30px />
                {lowerCDSharps}
                <Spacer60px />
                {lowerFGASharps}
                <Spacer60px />
                <Spacer30px />
                {upperCDSharps}
                <Spacer60px />
                {upperFGASharps}
                <Spacer30px />
            </div>
        </>
    );
};

export default BlackKeys;
