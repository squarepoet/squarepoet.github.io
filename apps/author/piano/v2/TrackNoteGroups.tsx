import PianoAuthorV2 from "apps/author/piano/v2/App";
import classNames from "classnames";

const Song = PianoAuthorV2.Song;

type Props = {
    trackNumber: number;
    trackIsHighlighted: boolean;
    highlightedNoteGroupNumber: number;
};

const TrackNoteGroups = (props: Props) => {
    const { trackNumber, trackIsHighlighted, highlightedNoteGroupNumber } = props;

    const numNoteGroups = Song.getNumNoteGroupsInTrack(trackNumber);

    const noteGroups = [];
    for (let noteGroupNumber = 0; noteGroupNumber < numNoteGroups; noteGroupNumber++) {
        const noteGroup = Song.getNoteGroupFromTrack(noteGroupNumber, trackNumber);
        const noteGroupContainsMultipleNotes = noteGroup.numNotes > 1;
        const shouldHighlightThisNoteGroup = trackIsHighlighted && highlightedNoteGroupNumber == noteGroupNumber;
        const noteGroupClasses = classNames("notegroup", { multiple: noteGroupContainsMultipleNotes, highlight: shouldHighlightThisNoteGroup });
        const noteGroupID = Song.getNoteGroupID(trackNumber, noteGroupNumber); // t_0_n_0 stands for track 0 notegroup 0
        noteGroups.push(
            <div key={noteGroupID} id={noteGroupID} className={noteGroupClasses}>
                {noteGroup.toString()}
            </div>
        );
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

export default TrackNoteGroups;
