const Shortcuts = () => {
    return (
        <div>
            shift + esc &rarr; clear
            <br />
            cmd + c &rarr; copy <br />
            arrow keys &rarr; adjust
            <br />
            tab &rarr; combine
            <style jsx>{`
                div {
                    float: right;
                    text-align: right;
                    font-size: 70%;
                    line-height: 150%;
                    margin-left: 20px;
                }
            `}</style>
        </div>
    );
};

export default Shortcuts;
