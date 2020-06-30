import PianoAuthorV1, { CANVAS_HEIGHT, CANVAS_WIDTH } from "apps/author/piano/v1/app";
import KeyboardShortcuts from "apps/author/piano/v1/KeyboardShortcuts";
import SharpsAndFlats from "apps/author/piano/v1/SharpsAndFlats";
import React, { useEffect, useState } from "react";
import { useEventListener } from "use-hooks";

export default () => {
    if (typeof window !== "undefined") {
        useEventListener("keydown", (e) => {
            PianoAuthorV1.keydown(e);
        });
        useEventListener("keyup", (e) => {
            PianoAuthorV1.keyup(e);
        });
    }

    useEffect(() => {
        PianoAuthorV1.start();
    }, []);

    return (
        <>
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
                    <canvas id="pianoCanvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
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

export async function getStaticProps(context) {
    return {
        props: {
            title: "Piano Author V1",
        },
    };
}
