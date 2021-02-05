import SharpsAndFlats from "apps/author/piano/shared/SharpsAndFlats";
import PianoAuthorV2 from "apps/author/piano/v2/App";
import BottomPanel from "apps/author/piano/v2/BottomPanel";
import DownloadSong from "apps/author/piano/v2/DownloadSong";
import Highlight from "apps/author/piano/v2/Highlight";
import KeyboardShortcuts from "apps/author/piano/v2/KeyboardShortcuts";
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

const AppContainer = () => {
    // const workerRef = useRef<Worker>();
    const [showPreloadDialog, setShowPreloadDialog] = useState(true);
    const [fileInfo, setFileInfo] = useState("");
    const [songInfo, setSongInfo] = useState("");
    const [highlightedTrackNumber, setHighlightedTrackNumber] = useState(0);
    const [highlightedNoteGroupNumber, setHighlightedNoteGroupNumber] = useState(0);

    const sharpsAndFlatsInput = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        Highlight.setupCallbacks(setHighlightedTrackNumber, setHighlightedNoteGroupNumber, PianoAuthorV2.UI.drawPiano, PianoAuthorV2.Song.getNumTracks, PianoAuthorV2.Song.getNumNoteGroupsInTrack, PianoAuthorV2.UI.scrollNoteGroupIntoView);
        PianoAuthorV2.setDispatchFunction(dispatch);

        const isFocusedOnInputs = () => {
            if (sharpsAndFlatsInput && sharpsAndFlatsInput.current) {
                return (sharpsAndFlatsInput.current as any).hasFocus();
            } else {
                return false;
            }
        };
        const getSharps = () => {
            if (sharpsAndFlatsInput && sharpsAndFlatsInput.current) {
                return (sharpsAndFlatsInput.current as any).getSharps();
            } else {
                return "";
            }
        };
        const getFlats = () => {
            if (sharpsAndFlatsInput && sharpsAndFlatsInput.current) {
                return (sharpsAndFlatsInput.current as any).getFlats();
            } else {
                return "";
            }
        };
        PianoAuthorV2.setHandlersForSharpsAndFlatsInput(isFocusedOnInputs, getSharps, getFlats);
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

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // MIDI FILE LOADING
    // Subscribe to changes in the loaded file's timestamp.
    const midiFileTimestamp = useSelector((state) => state[Keys.FILE_TIMESTAMP]);
    useEffect(() => {
        // Update the UI here with data from our MIDIFileIO...
        console.log(`Loaded a file at timestamp: ${midiFileTimestamp}`);
        const midiFile = MIDIFileIO.getLoadedFile();
        const midiEvents = MIDIFileIO.getLoadedMIDIEvents();
        PianoAuthorV2.fillTracksWithNoteGroupsExtractedFromMIDIEvents(midiFile, midiEvents);

        if (midiFile !== null) {
            setFileInfo(`Loaded File: ${MIDIFileIO.getFileName()} | Size: ${MIDIFileIO.getFileSize()} bytes | Num Tracks: ${MIDIFileIO.getNumTracks()}`);
            const durationRounded = Math.round(MIDIFileIO.getDurationInSeconds() * 100) / 100;
            setSongInfo(`Num Tracks: ${MIDIFileIO.getNumTracks()} | Duration: ${durationRounded} secs`);
        }
    }, [midiFileTimestamp]);
    //
    //////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            {showPreloadDialog ? <PreloadDialog initialOpenState={showPreloadDialog} preloadNow={startAudio} /> : null}
            <DownloadSong />
            <VersionToggle />
            <KeyboardShortcuts />
            <SharpsAndFlats ref={sharpsAndFlatsInput} style={{ float: "right" }} />
            <div id="content" className="content">
                <Tracks highlightedTrackNumber={highlightedTrackNumber} highlightedNoteGroupNumber={highlightedNoteGroupNumber} />
                <PianoKeyboard />
            </div>
            <BottomPanel>
                <MIDIFileChooser />
                <div id="file-info" className="bottom-info">
                    {fileInfo}
                </div>
                <div id="song-info" className="bottom-info">
                    {songInfo}
                </div>
                <PlayPauseStop onPlay={PianoAuthorV2.Playback.play} onPause={PianoAuthorV2.Playback.pause} onStop={PianoAuthorV2.Playback.stop} />
            </BottomPanel>
            <style jsx global>{`
                html {
                    margin: 15px 1% 0px 1%;
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

                .bottom-info {
                    margin-bottom: 10px;
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

export default AppContainer;
