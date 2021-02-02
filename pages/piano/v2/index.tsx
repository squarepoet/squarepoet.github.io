import SharpsAndFlats from "apps/author/piano/shared/SharpsAndFlats";
import PianoAuthorV2 from "apps/author/piano/v2/App";
import DownloadSong from "apps/author/piano/v2/DownloadSong";
import Highlight from "apps/author/piano/v2/Highlight";
import MIDIFileChooser from "apps/author/piano/v2/MIDIFileChooser";
import PianoKeyboard from "apps/author/piano/v2/PianoKeyboard";
import PlayPauseStop from "apps/author/piano/v2/PlayPauseStop";
import Tracks from "apps/author/piano/v2/Tracks";
import VersionToggle from "apps/author/piano/v2/VersionToggle";
import Constants from "apps/shared/Constants";
import MIDIFileIO from "apps/shared/midi/MIDIFileIO";
import PreloadDialog from "components/dialogs/Preload";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEventListener } from "use-hooks";

const Keys = Constants.StoreKeys;

// function onPianoClockWorkerMessage(e) {
//     console.log(new Date().getTime());
// }

const Page = () => {
    // const workerRef = useRef<Worker>();
    const [showPreloadDialog, setShowPreloadDialog] = useState(true);
    const [fileInfo, setFileInfo] = useState("");
    const [highlightedTrackNumber, setHighlightedTrackNumber] = useState(0);
    const [highlightedNoteGroupNumber, setHighlightedNoteGroupNumber] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        Highlight.setupCallbacks(setHighlightedTrackNumber, setHighlightedNoteGroupNumber, PianoAuthorV2.UI.drawPiano, PianoAuthorV2.Song.getNumTracks, PianoAuthorV2.Song.getNumNoteGroupsInTrack, PianoAuthorV2.UI.scrollNoteGroupIntoView);
        PianoAuthorV2.setDispatchFunction(dispatch);
        PianoAuthorV2.start();

        // workerRef.current = new Worker("./clock.worker.js", { type: "module" });
        // workerRef.current.postMessage("start");
        // workerRef.current.addEventListener("message", onPianoClockWorkerMessage);

        // return () => {
        //     workerRef.current?.terminate();
        // };
    }, []);

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e: KeyboardEvent) => {
            PianoAuthorV2.onKeyDown(e);
        });
        useEventListener("keyup", (e: KeyboardEvent) => {
            PianoAuthorV2.onKeyUp(e);
        });
    }

    function startAudio() {
        PianoAuthorV2.startAudio();
        setShowPreloadDialog(false);
    }

    // Subscribe to changes in songVersion
    const songVersion = useSelector((state) => state[Keys.SONG_VERSION]);
    useEffect(() => {
        PianoAuthorV2.saveSongVersionToLocalStorage(songVersion);
    }, [songVersion]);

    // Subscribe to changes in the loaded file's timestamp.
    const midiFileTimestamp = useSelector((state) => state[Keys.FILE_TIMESTAMP]);
    useEffect(() => {
        // update the UI here with data from our MIDIFileIO...
        console.log(`Loaded a file at timestamp: ${midiFileTimestamp}`);
        const midiFile = MIDIFileIO.getLoadedFile();
        const midiEvents = MIDIFileIO.getLoadedEvents();
        PianoAuthorV2.fillTracksWithNoteGroupsExtractedFromMIDIEvents(midiFile, midiEvents);
        PianoAuthorV2.displaySongInfo(MIDIFileIO.getNumTracks(), MIDIFileIO.getDurationInSeconds());

        if (midiFile !== null) {
            setFileInfo(`Loaded File: ${MIDIFileIO.getFileName()} | Size: ${MIDIFileIO.getFileSize()} bytes`);
        }
    }, [midiFileTimestamp]);

    return (
        <>
            {showPreloadDialog ? <PreloadDialog initialOpenState={showPreloadDialog} preloadNow={startAudio} /> : null}
            <DownloadSong />
            <VersionToggle />
            <div className="shortcuts">
                ctrl &rarr; flat &nbsp;&nbsp;&nbsp;&nbsp; alt &rarr; sharp &nbsp;&nbsp;&nbsp;&nbsp; shift + esc &rarr; clear
                <br />
                up/down &rarr; +/- octave &nbsp;&nbsp;&nbsp;&nbsp; tab &rarr; combine &nbsp;&nbsp;&nbsp;&nbsp; cmd + c &rarr; copy
            </div>
            <SharpsAndFlats style={{ float: "right" }} />
            <div id="content" className="content">
                <Tracks highlightedTrackNumber={highlightedTrackNumber} highlightedNoteGroupNumber={highlightedNoteGroupNumber} />
                <PianoKeyboard />
            </div>
            <div id="current-status">&nbsp;</div>
            <div id="bottom-panel">
                <MIDIFileChooser />
                <div id="file-info" className="bottom-info">
                    {fileInfo}
                </div>
                <div id="song-info" className="bottom-info">
                    &nbsp;
                </div>
                <PlayPauseStop onPlay={PianoAuthorV2.Playback.play} onPause={PianoAuthorV2.Playback.pause} onStop={PianoAuthorV2.Playback.stop} />
            </div>
            <style jsx global>{`
                html {
                    margin: 15px 1% 0px 1%;
                }

                .notegroup {
                    box-sizing: border-box;
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    padding: 0px 3px;
                    margin: 4px 1px 0px 1px;
                }

                .notegroup.multiple {
                    color: #59b;
                }

                .shortcuts {
                    float: right;
                }

                html.drag {
                    background-color: #dffafb;
                }

                .content {
                    width: 100%;
                    text-align: center;
                    clear: both;
                    padding-top: 10px;
                }

                input {
                    width: 50px;
                }

                #bottom-panel {
                    padding: 20px;
                    text-align: center;
                    color: #444;
                    background-color: #666;
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    right: 0px;
                }

                #bottom-panel.drag {
                    background-color: #dffafb;
                    font-weight: bold;
                    color: #f66;
                }

                .bottom-info {
                    margin-bottom: 10px;
                }

                #tracks {
                    min-height: 40px;
                }

                .track-container {
                    height: 40px;
                    margin-bottom: 6px;
                }

                .track-container.empty {
                    height: 22px;
                }

                .track {
                    box-sizing: border-box;
                    width: 90%;
                    height: 100%;
                    background-color: #dffafb;
                    text-align: left;
                    font-family: Inconsolata, Menlo, Monaco, sans-serif;
                    font-size: 11pt;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    margin: 0;
                    padding: 0 10px;
                    white-space: nowrap;
                    display: inline-block;
                    line-height: 100%;
                    -webkit-user-select: none;
                    user-select: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0);
                }

                .track-info {
                    box-sizing: border-box;
                    width: 38px;
                    height: 100%;
                    background-color: #f0f4ff;
                    color: #666;
                    text-align: center;
                    font-family: Inconsolata, Menlo, Monaco, sans-serif;
                    font-size: 11pt;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    white-space: nowrap;
                    margin: 0px 0;
                    display: inline-block;
                    line-height: 40px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0);
                }

                .checkbox {
                    box-sizing: border-box;
                    width: 14px;
                    height: 100%;
                    vertical-align: top;
                    margin: 0px;
                    margin-right: 6px;
                    border: 0px;
                    padding: 0px;
                }

                /* always show scrollbars */

                ::-webkit-scrollbar {
                    width: 0px;
                    height: 3px;
                }

                ::-webkit-scrollbar-thumb {
                    border-radius: 0px;
                    background-color: rgba(0, 0, 0, 0.18);
                }

                .sharps-and-flats {
                    float: right;
                    margin-right: 20px;
                    text-align: right;
                }

                #current-status {
                    margin: 10px 0;
                    padding: 6px 0px;
                    width: 100%;
                    color: #333;
                    background-color: #bdc;
                    position: absolute;
                    height: 50px;
                    bottom: 100px;
                    left: 0px;
                    right: 0px;
                }

                /* animate the played notegroup */

                /* The animation code */
                @keyframes played-note-animation {
                    0% {
                        background-color: rgba(55, 180, 255, 0.85);
                        color: #cdf;
                    }
                    100% {
                        background-color: rgba(55, 180, 255, 0);
                        color: #59f;
                    }
                }

                .played-note {
                    animation-name: played-note-animation;
                    animation-duration: 0.4s;
                }

                /* tweak the margins on half-width display */
                @media only screen and (max-width: 1024px) {
                    .checkbox {
                        width: 18px;
                    }
                    .track-info {
                        width: 20px;
                    }
                    .track {
                        width: 88%;
                    }
                }
            `}</style>
        </>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Piano Author V2",
        },
    };
}

/*


    <head>
        <link rel="stylesheet" href="/s/css/author.v2.css" type="text/css" media="screen" />
        


        <!-- JSMIDGEN - CREATE MIDI FILES -->
        <script type="text/javascript" src="/s/js/jsmidgen.js"></script>

        <!-- DRAG & DROP SUPPORT -->
        <script type="text/javascript" src="/s/js/dragdrop.min.js"></script>

        <!-- MIDI FILE READING -->
        <script type="text/javascript" src="/s/js/midifile/UTF8.js"></script>
        <script type="text/javascript" src="/s/js/midifile/MIDIEvents.js"></script>
        <script type="text/javascript" src="/s/js/midifile/MIDIFileHeader.js"></script>
        <script type="text/javascript" src="/s/js/midifile/MIDIFileTrack.js"></script>
        <script type="text/javascript" src="/s/js/midifile/MIDIFile.js"></script>

        <!-- SQUAREPOET's AUTHORING TOOL -->
        <script type="text/javascript" src="/s/js/author/music.js"></script>
        <script type="text/javascript" src="/s/js/author/piano.v2.js"></script>
    </head>


*/
