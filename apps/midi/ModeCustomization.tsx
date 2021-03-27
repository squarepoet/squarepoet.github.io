import LUMIKeys from "apps/shared/midi/LUMIKeys";

const ModeCustomization = () => {
    const buttonStyle = { height: "40px", margin: "8px 0px" };

    const modeNumbers = [1, 2, 3, 4];
    const headerRow = modeNumbers.map((val, index) => {
        return (
            <div key={"switchToMode_" + val} className="dtCell">
                <a onClick={LUMIKeys.getClickHandler_SwitchToMode(val)}>Mode {val}</a>
            </div>
        );
    });

    const row0 = modeNumbers.map((val) => {
        return (
            <div key={"setColorModePro_" + val} className="dtCell">
                <button style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetColorMode(val, "pro")}>
                    pro
                </button>
                <div className="dtCellNote">highlight root note with single rainbow color</div>
            </div>
        );
    });

    const row1 = modeNumbers.map((val) => {
        return (
            <div key={"setColorModeUser_" + val} className="dtCell">
                <button style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetColorMode(val, "user")}>
                    user
                </button>
                <div className="dtCellNote">highlight root note with user selected color</div>
            </div>
        );
    });

    const row2 = modeNumbers.map((val) => {
        return (
            <div key={"setColorModePiano_" + val} className="dtCell">
                <button style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetColorMode(val, "piano")}>
                    piano 🎹
                </button>
                <div className="dtCellNote">white and black keys</div>
            </div>
        );
    });

    const row3 = modeNumbers.map((val) => {
        return (
            <div key={"setColorModeStage_" + val} className="dtCell">
                <button style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetColorMode(val, "stage")}>
                    stage 🎧
                </button>
                <div className="dtCellNote">dim rainbow colors, appropriate for a dark room</div>
            </div>
        );
    });

    const row4 = modeNumbers.map((val) => {
        return (
            <div key={"setColorModeRainbow_" + val} className="dtCell">
                <button style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetColorMode(val, "rainbow")}>
                    rainbow 🌈
                </button>
                <div className="dtCellNote">bright rainbow colors, black sharps/flats</div>
            </div>
        );
    });

    const pitchBendButtonStyle = { width: "50%", height: "50px", margin: "8px 0px" };

    const row5 = modeNumbers.map((val) => {
        return (
            <div key={"setPitchBend_" + val} className="dtCell">
                <div className="dtCellNote">pitch bend</div>
                <button style={pitchBendButtonStyle} onClick={LUMIKeys.getClickHandler_PitchBend(val, true)}>
                    <b>ON</b>
                </button>
                <button style={pitchBendButtonStyle} onClick={LUMIKeys.getClickHandler_PitchBend(val, false)}>
                    OFF
                </button>
            </div>
        );
    });

    return (
        <>
            <div className="dt">
                <div className="dtHead">{headerRow}</div>
                <div className="dtBody">
                    <div className="dtRow">{row0}</div>
                    <div className="dtRow">{row1}</div>
                    <div className="dtRow">{row2}</div>
                    <div className="dtRow">{row3}</div>
                    <div className="dtRow">{row4}</div>
                    <div className="dtRow">{row5}</div>
                </div>
            </div>
        </>
    );
};

export default ModeCustomization;
