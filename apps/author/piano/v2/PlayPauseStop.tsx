const PlayPauseStop = (props) => {
    function onPlayClicked() {
        props.onPlay();
    }

    function onPauseClicked() {
        props.onPause();
    }

    function onStopClicked() {
        props.onStop();
    }

    return (
        <>
            <div id="buttons">
                <a id="play-button" onClick={onPlayClicked}>
                    Play
                </a>{" "}
                |{" "}
                <a id="pause-button" onClick={onPauseClicked}>
                    Pause
                </a>{" "}
                |{" "}
                <a id="stop-button" onClick={onStopClicked}>
                    Stop
                </a>
            </div>
        </>
    );
};

export default PlayPauseStop;
