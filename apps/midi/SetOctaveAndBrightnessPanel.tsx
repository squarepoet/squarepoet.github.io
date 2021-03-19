import LUMIKeys from "apps/shared/midi/LUMIKeys";

const SetOctaveAndBrightnessPanel = () => {
    return (
        <>
            <div>
                <div>Set Octave</div>
                <div>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(-4)}>-4</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(-3)}>-3</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(-2)}>-2</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(-1)}>-1</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(0)} style={{ width: "100px" }}>
                        0
                    </button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(1)}>1</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(2)}>2</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(3)}>3</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(4)}>4</button>
                    <button onClick={LUMIKeys.getClickHandler_SetOctave(5)}>5</button>
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
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(20)}>20%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(10)}>10%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(1)}>1%</button>
                    <button onClick={LUMIKeys.getClickHandler_SetBrightness(0)}>0%</button>
                </div>
            </div>
            <style jsx>{``}</style>
        </>
    );
};
export default SetOctaveAndBrightnessPanel;
