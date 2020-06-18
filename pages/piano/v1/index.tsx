import * as React from "react";

// class CanvasComponent extends React.Component {
//     componentDidMount() {
//         this.updateCanvas();
//     }
//     componentDidUpdate() {
//         this.updateCanvas();
//     }
//     updateCanvas() {
//         const cvs: any = this.refs.canvas;
//         const ctx = cvs.getContext("2d");
//         ctx.clearRect(0, 0, 1000, 1000);
//         ctx.fillStyle = "#FDFDFD";
//         this.drawRect({ ctx, x: 0, y: 0, width: 50, height: 50 });
//         this.drawRect({ ctx, x: 950, y: 950, width: 50, height: 50 });
//     }
//     render() {
//         return (
//             <div>
//                 <canvas ref="canvas" width={1000} height={1000}></canvas>
//                 <style jsx>{`
//                     canvas {
//                         border: 1px solid red;
//                     }
//                 `}</style>
//             </div>
//         );
//     }
//     drawRect(props) {
//         const { ctx, x, y, width, height } = props;
//         ctx.fillRect(x, y, width, height);
//     }
// }

export default () => {
    return (
        <>
            <div>
                shift &rarr; sharp &nbsp;&nbsp;&nbsp;&nbsp; ctrl &rarr; flat &nbsp;&nbsp;&nbsp;&nbsp; shift + esc &rarr; clear
                <br /> up/down &rarr; +/- octave &nbsp;&nbsp;&nbsp;&nbsp; tab &rarr; combine &nbsp;&nbsp;&nbsp;&nbsp; cmd + c &rarr; copy
                <style jsx>
                    {`
                        div {
                            float: right;
                        }
                    `}
                </style>
            </div>
            <div>
                sharps: <input id="sharps-text" /> flats: <input id="flats-text" />
                <style jsx>{`
                    div {
                        float: right;
                        margin-right: 20px;
                    }
                `}</style>
            </div>
            <div id="clear">
                <div id="clearText">Clear</div>
            </div>
            <br />
            <div id="content">
                <textarea id="textarea" rows={5} cols={80}></textarea>
                <canvas id="pianoCanvas" width="1040" height="150"></canvas>
                <style jsx>{`
                    div {
                        width: 100%;
                        text-align: center;
                    }
                    canvas {
                        border: 1px solid #444;
                    }
                    textarea {
                        width: 1040px;
                    }
                `}</style>
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
