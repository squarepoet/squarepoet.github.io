import LUMIKeys from "apps/shared/midi/LUMIKeys";

const SetScaleType = () => {
    const buttonStyle = { width: "140px", height: "40px", marginBottom: "8px" };

    const generateButtons = (scaleNames: string[]) => {
        return scaleNames.map((val) => {
            return (
                <button key={"setScale_" + val} style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetScaleType(val)}>
                    {val.replace(/-/g, " ")}
                </button>
            );
        });
    };

    const row0 = ["major", "minor", "blues", "harmonic-minor", "major-pentatonic", "minor-pentatonic", "neutral-pentatonic"];
    const row1 = ["dorian", "phrygian", "lydian", "mixolydian", "locrian"];
    const row2 = ["chromatic", "whole-tone", "arabic-a", "arabic-b", "japanese", "ryukyu", "8-tone-spanish"];
    const row0_buttons = generateButtons(row0);
    const row1_buttons = generateButtons(row1);
    const row2_buttons = generateButtons(row2);

    return (
        <div>
            <div>Scale Type</div>
            <div>{row0_buttons}</div>
            <div>{row1_buttons}</div>
            <div>{row2_buttons}</div>
        </div>
    );
};
export default SetScaleType;
