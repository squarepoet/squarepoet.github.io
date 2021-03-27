import LUMIKeys from "apps/shared/midi/LUMIKeys";

const SetScaleRoot = () => {
    const buttonStyle = { width: "80px", height: "40px" };
    const noteNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
    const buttons = noteNames.map((noteName) => {
        return (
            <button key={"setScaleRoot_" + noteName} style={buttonStyle} onClick={LUMIKeys.getClickHandler_SetScaleRoot(noteName)}>
                {noteName}
            </button>
        );
    });
    return (
        <>
            <div>
                <div>Scale Root</div>
                <div>{buttons}</div>
            </div>
        </>
    );
};
export default SetScaleRoot;
