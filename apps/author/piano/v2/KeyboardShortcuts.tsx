const KeyboardShortcuts = () => {
    return (
        <>
            <div className="shortcuts">
                ctrl &rarr; flat &nbsp;&nbsp;&nbsp; alt &rarr; sharp &nbsp;&nbsp;&nbsp; shift + esc &rarr; clear
                <br />
                page up/dn &rarr; +/- octave &nbsp;&nbsp;&nbsp; tab &rarr; combine &nbsp;&nbsp;&nbsp; cmd + c &rarr; copy
            </div>
            <style jsx>{`
                div {
                    float: right;
                    font-size: 75%;
                    text-align: right;
                }
            `}</style>
        </>
    );
};
export default KeyboardShortcuts;
