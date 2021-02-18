import { useEffect, useRef } from "react";

import FretCanvas from "./FretCanvas";

type FretCanvasProps = {
    numStrings: number;
};

const PADDING_H = 40;

const FretCanvasContainer = ({ numStrings }: FretCanvasProps) => {
    const canvasRef = useRef();

    const canvasWidth = 1040;
    const canvasHeight = numStrings * 40 + PADDING_H;

    useEffect(() => {
        FretCanvas.draw(canvasRef.current, numStrings);
    }, [numStrings]);

    return (
        <>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
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
