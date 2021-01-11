import { CANVAS_HEIGHT, CANVAS_WIDTH } from "apps/author/piano/v1/App";

const showXY = (e) => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - currentTargetRect.left;
    const y = e.pageY - currentTargetRect.top;
    console.log("Clicked at " + x + ", " + y); // 0, 0 is at the top left corner of the piano canvas.
};

const Page = (props) => {
    const canvasRef = props.canvasRef;
    return (
        <div id="content">
            <textarea id="textarea" rows={8} cols={100}></textarea>
            <canvas id="pianoCanvas" ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onClick={showXY}></canvas>
            <style jsx>{`
                div {
                    width: 100%;
                    text-align: center;
                }
                textarea {
                    font-family: Hack, Inconsolata, Menlo, Monaco, monospace;
                    font-size: 16pt;
                    box-sizing: border-box;
                    border: none;
                    width: 1044px;
                    display: block;
                    margin: 0 auto;
                }
                canvas {
                    border: 2px solid #444;
                    width: 1040px;
                    height: 150px;
                    display: block;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default Page;
