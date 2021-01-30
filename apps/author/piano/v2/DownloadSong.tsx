import PianoAuthorV2 from "apps/author/piano/v2/App";
import Constants from "apps/shared/Constants";
import { useState } from "react";

const DownloadSong = () => {
    const [downloadData_MIDI, setDownloadData_MIDI] = useState(Constants.DEFAULT_DOWNLOAD_DATA);
    const [downloadData_TEXT, setDownloadData_TEXT] = useState(Constants.DEFAULT_DOWNLOAD_DATA);

    function onMouseOverMIDI() {
        const data = PianoAuthorV2.getDownloadData_MIDI();
        setDownloadData_MIDI(data);
    }

    function onMouseOverTEXT() {
        const data = PianoAuthorV2.getDownloadData_TEXT();
        setDownloadData_TEXT(data);
    }

    return (
        <>
            <div>
                Save as&nbsp;
                <a href={"data:audio/midi;base64," + downloadData_MIDI} download="song.mid" onMouseOver={onMouseOverMIDI}>
                    MIDI
                </a>
                &nbsp;or&nbsp;
                <a href={"data:text/plain;base64," + downloadData_TEXT} download="song.txt" onMouseOver={onMouseOverTEXT}>
                    TEXT
                </a>
            </div>
            <style jsx>{`
                div {
                    float: left;
                    margin: 3px 0px;
                }
            `}</style>
        </>
    );
};

export default DownloadSong;
