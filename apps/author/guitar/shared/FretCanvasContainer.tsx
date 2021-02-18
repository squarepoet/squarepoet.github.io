import { useEffect, useRef } from "react";

import FretCanvas from "./FretCanvas";

type FretCanvasProps = {
    numStrings: number;
    computerKeyboardFretOffset: number; // Press a key on the keyboard to play the corresponding {string, fret}
    computerKeyboardStringOffset: number;
};

const PADDING_H = 40;

const FretCanvasContainer = ({ numStrings, computerKeyboardFretOffset, computerKeyboardStringOffset }: FretCanvasProps) => {
    const canvasRef = useRef();

    const canvasWidth = 1040;
    const canvasHeight = numStrings * 40 + PADDING_H;

    useEffect(() => {
        const { context2d, width, height } = FretCanvas.getContext(canvasRef.current);
        if (context2d) {
            context2d.scale(2, 2); // Support retina displays by drawing @ 2x resolution.
            FretCanvas.drawStringsAndFrets(context2d, width, height, numStrings);
            FretCanvas.drawNoteLabels(context2d, numStrings);
            FretCanvas.drawComputerKeyboardLabels(context2d, numStrings, computerKeyboardFretOffset, computerKeyboardStringOffset);
            context2d.setTransform(1, 0, 0, 1, 0, 0); // Reset the scale.
        }
    }, [numStrings, computerKeyboardFretOffset, computerKeyboardStringOffset]);

    return (
        <>
            <canvas ref={canvasRef} width={canvasWidth * 2} height={canvasHeight * 2} style={{ width: canvasWidth, height: canvasHeight }}></canvas>
            <style jsx>{`
                div {
                    margin-top: 30px;
                }
                canvas {
                    background-color: black;
                    margin: 0 auto;
                    display: block;
                }
            `}</style>
        </>
    );
};
export default FretCanvasContainer;
