import PianoAuthorV2 from "apps/author/piano/v2/App";

const MIDIFileChooser = () => {
    function onFilesChanged(e) {
        PianoAuthorV2.loadFirstFile(e.target.files);
    }

    function onClick(e) {
        (document.getElementById("filechooser") as HTMLInputElement).value = null;
    }

    return (
        <>
            <div className="upload-file-panel bottom-info">
                <input type="file" id="filechooser" onChange={onFilesChanged} />
                <label id="filechooserlabel" htmlFor="filechooser" onClick={onClick}>
                    Upload a MIDI file!
                </label>
            </div>
            <style jsx>{`
                .upload-file-panel {
                    color: #4df;
                    text-decoration: underline;
                }
                #filechooser {
                    display: none;
                }
                #filechooserlabel {
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default MIDIFileChooser;
