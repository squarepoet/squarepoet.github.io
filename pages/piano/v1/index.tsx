import * as React from "react";

class CanvasComponent extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const cvs: any = this.refs.canvas;
        const ctx = cvs.getContext("2d");
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.fillStyle = "#FDFDFD";
        this.drawRect({ ctx, x: 0, y: 0, width: 50, height: 50 });
        this.drawRect({ ctx, x: 950, y: 950, width: 50, height: 50 });
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={1000} height={1000}></canvas>
                <style jsx>{`
                    canvas {
                        border: 1px solid red;
                    }
                `}</style>
            </div>
        );
    }
    drawRect(props) {
        const { ctx, x, y, width, height } = props;
        ctx.fillRect(x, y, width, height);
    }
}

function Page() {
    return <CanvasComponent />;
}

export default Page;
