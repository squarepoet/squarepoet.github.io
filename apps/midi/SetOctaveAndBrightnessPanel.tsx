import LUMIKeys from "apps/shared/midi/LUMIKeys";
import classNames from "classnames";

const SetOctaveAndBrightnessPanel = () => {
    const octaveOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const setOctaveButtons = octaveOffsets.map((val) => {
        const classes = classNames({ isOctave0: val === 0 });
        return (
            <button key={"setOctave_" + val} className={classes} onClick={LUMIKeys.getClickHandler_SetOctave(val)}>
                {val}
            </button>
        );
    });

    const brightnessLevels = [100, 75, 50, 25, 20, 10, 1, 0];
    const setBrightnessButtons = brightnessLevels.map((val) => {
        return (
            <button key={"setBrightness_" + val} onClick={LUMIKeys.getClickHandler_SetBrightness(val)}>
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
            <style jsx global>{`
                button.isOctave0 {
                    width: 100px;
                }
            `}</style>
        </>
    );
};
export default SetOctaveAndBrightnessPanel;
