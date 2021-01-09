import PianoAuthorV1, { CANVAS_HEIGHT, CANVAS_WIDTH } from "apps/author/piano/v1/App";
import KeyboardShortcuts from "apps/author/piano/v1/KeyboardShortcuts";
import SharpsAndFlats from "apps/author/piano/v1/SharpsAndFlats";
import Piano, { PianoType } from "apps/shared/sound/Piano";
import PreloadDialog from "components/dialogs/Preload";
import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "use-hooks";

const showXY = (e) => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - currentTargetRect.left;
    const y = e.pageY - currentTargetRect.top;
    console.log("Clicked at " + x + ", " + y); // 0, 0 is at the top left corner of the piano canvas.
};

const Page = () => {
    const canvasRef = useRef(null);
    const [showPreloadDialog, setShowPreloadDialog] = useState(true);

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {
            PianoAuthorV1.keydown(e);
        });
        useEventListener("keyup", (e) => {
            PianoAuthorV1.keyup(e);
        });
    }

    function startAudio() {
        PianoAuthorV1.startAudio();
        setShowPreloadDialog(false);
    }

    useEffect(() => {
        PianoAuthorV1.startUI(canvasRef);
    }, []);

    return (
        <>
            {showPreloadDialog ? <PreloadDialog initialOpenState={showPreloadDialog} preloadNow={startAudio} /> : null}
            <div>
                <KeyboardShortcuts />
                <SharpsAndFlats />
                <div>
                    <style jsx>{`
                        div {
                            clear: both;
                        }
                    `}</style>
                </div>
                <br />
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
            </div>
        </>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Piano Author V1",
        },
    };
}
