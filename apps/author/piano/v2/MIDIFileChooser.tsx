import MIDIFileIO from "apps/shared/midi/MIDIFileIO";
import Actions from "apps/shared/redux/Actions";
import { useDispatch } from "react-redux";

const MIDIFileChooser = () => {
    const dispatch = useDispatch();

    function onFilesChanged(e) {
        const files = e.target.files;
        if (files.length > 0) {
            MIDIFileIO.readFile(files[0]); // Get the first file.
            dispatch({ type: Actions.FileChooser.onFileLoaded });
        }
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
