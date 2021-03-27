import LUMIKeys from "apps/shared/midi/LUMIKeys";
import classNames from "classnames";

const SetOctaveAndBrightness = () => {
    const buttonStyle = { width: "80px", height: "40px" };

    const octaveOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const setOctaveButtons = octaveOffsets.map((octaveNum) => {
        let localButtonStyle = buttonStyle;
        if (octaveNum === 0) {
            localButtonStyle = { width: "160px", height: "40px" };
        }

        return (
            <button key={"setOctave_" + octaveNum} style={localButtonStyle} onClick={LUMIKeys.getClickHandler_SetOctave(octaveNum)}>
                {octaveNum}
            </button>
        );
    });

    const brightnessLevels = [100, 75, 50, 25, 20, 10, 1, 0];
    const setBrightnessButtons = brightnessLevels.map((val) => {
        return (
            <button key={"setBrightness_" + val} style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetBrightness(val)}>
                {val}%
            </button>
        );
    });

    return (
        <>
            <div>
                <div>Set Octave 🎼</div>
                <div>{setOctaveButtons}</div>
            </div>
            <br />
            <div>
                <div>Brightness ☀️</div>
                <div>{setBrightnessButtons}</div>
            </div>
        </>
    );
};
export default SetOctaveAndBrightness;
