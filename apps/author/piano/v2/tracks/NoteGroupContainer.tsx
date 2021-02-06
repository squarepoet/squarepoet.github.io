import PianoAuthorV2 from "apps/author/piano/v2/App";
import NoteGroup from "apps/author/piano/v2/tracks/NoteGroup";

const Song = PianoAuthorV2.Song;

type Props = {
    trackNumber: number;
    highlightedNoteGroupNumber: number; // Is -1 if the current track is NOT highlighted.
};

const NoteGroupContainer = ({ trackNumber, highlightedNoteGroupNumber }: Props) => {
    const numNoteGroups = Song.getNumNoteGroupsInTrack(trackNumber);

    const noteGroups = [];
    for (let noteGroupNumber = 0; noteGroupNumber < numNoteGroups; noteGroupNumber++) {
        const isHighlighted = noteGroupNumber == highlightedNoteGroupNumber;
        const keyAndID = Song.getNoteGroupID(trackNumber, noteGroupNumber); // t_0_n_0 stands for track 0 notegroup 0
        noteGroups.push(<NoteGroup key={keyAndID} id={keyAndID} trackNumber={trackNumber} noteGroupNumber={noteGroupNumber} isHighlighted={isHighlighted} />);
    }

    return (
        <>
            <div id={`track-${trackNumber}-notes`}>{noteGroups}</div>
            <style jsx>{`
                div {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 90%;
                    height: 40px;
                    background-color: #dffafb;
                    text-align: left;
                    font-size: 10pt;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    margin: 0;
                    padding: 0 10px;
                    white-space: nowrap;
                    line-height: 100%;
                    -webkit-user-select: none;
                    user-select: none;
                }
            `}</style>
            <style jsx global>{`
                .notegroup {
                    box-sizing: border-box;
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    padding: 0px 3px;
                    margin: 4px 1px 0px 1px;
                }
                .notegroup.highlight {
                    color: #f67;
                    background-color: rgba(238, 119, 153, 0.2);
                }
                .notegroup.multiple {
                    color: #59b;
                }
            `}</style>
        </>
    );
};

export default NoteGroupContainer;
