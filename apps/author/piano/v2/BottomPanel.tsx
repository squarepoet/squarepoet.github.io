import PianoAuthorV2 from "apps/author/piano/v2/App";
import { FileDrop } from "react-file-drop";

const BottomPanel = ({ children }) => {
    const onDrop = (files, event) => {
        console.log("Here are the dropped files", files);
        PianoAuthorV2.Playback.stop();
        PianoAuthorV2.loadFirstFile(files);
    };

    return (
        <div className="bottom-panel">
            <FileDrop
                onFrameDragEnter={(event) => console.log("onFrameDragEnter", event)}
                onFrameDragLeave={(event) => console.log("onFrameDragLeave", event)}
                onFrameDrop={(event) => console.log("onFrameDrop", event)}
                onDragOver={(event) => console.log("onDragOver", event)}
                onDragLeave={(event) => console.log("onDragLeave", event)}
                onDrop={onDrop}
            >
                <div className="bottom-panel-padding">{children}</div>
            </FileDrop>
            <style jsx global>{`
                div.bottom-panel {
                    background-color: #666;
                    text-align: center;
                    color: #444;
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    right: 0px;
                }

                div.bottom-panel-padding {
                    padding-top: 20px;
                    padding-bottom: 20px;
                }

                .file-drop {
                }

                .file-drop > .file-drop-target {
                }

                .file-drop > .file-drop-target.file-drop-dragging-over-frame {
                    background-color: #dffafb;
                    font-weight: bold;
                    color: #f66;
                }

                .file-drop > .file-drop-target.file-drop-dragging-over-target {
                }
            `}</style>
        </div>
    );
};

export default BottomPanel;
