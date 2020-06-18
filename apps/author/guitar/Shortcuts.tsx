export default function () {
    return (
        <div className="root">
            shift + esc &rarr; clear
            <br />
            cmd + c &rarr; copy <br />
            arrow keys &rarr; adjust
            <br />
            tab &rarr; combine
            <style jsx>{`
                .root {
                    float: right;
                    text-align: right;
                }
            `}</style>
        </div>
    );
}
