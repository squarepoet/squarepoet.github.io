import PianoAuthorV2 from "apps/author/piano/v2/App";
import classNames from "classnames";

const Song = PianoAuthorV2.Song;

type Props = {
    currTrackNumber: number;
    currTrackIsHighlighted: boolean;
    highlightedNoteGroupNumber: number;
};

const TrackNoteGroups = (props: Props) => {
    const { currTrackNumber, currTrackIsHighlighted, highlightedNoteGroupNumber } = props;

    const trackClasses = classNames("track", { highlight: currTrackIsHighlighted });

    const numNoteGroups = Song.getNumNoteGroupsInTrack(currTrackNumber);

    const noteGroups = [];
    for (let noteGroupNumber = 0; noteGroupNumber < numNoteGroups; noteGroupNumber++) {
        const noteGroup = Song.getNoteGroupFromTrack(noteGroupNumber, currTrackNumber);
        const noteGroupContainsMultipleNotes = noteGroup.numNotes > 1;
        const shouldHighlightThisNoteGroup = currTrackIsHighlighted && highlightedNoteGroupNumber == noteGroupNumber;
        const noteGroupClasses = classNames("notegroup", { multiple: noteGroupContainsMultipleNotes, highlight: shouldHighlightThisNoteGroup });
        const noteGroupID = Song.getNoteGroupID(currTrackNumber, noteGroupNumber); // t_0_n_0 stands for track 0 notegroup 0
        const noteGroupDIV = (
            <div key={noteGroupID} id={noteGroupID} className={noteGroupClasses}>
                {noteGroup.toString()}
            </div>
        );
        noteGroups.push(noteGroupDIV);
    }

    return (
        <>
            <div id={`track-${currTrackNumber}`} className={trackClasses}>
                <div>{noteGroups}</div>
            </div>
            <style jsx global>{`
                .track.highlight {
                    border-bottom: 1px solid rgba(238, 119, 153, 0.4);
                }

                .notegroup.highlight {
                    color: #f67;
                    background-color: rgba(238, 119, 153, 0.2);
                }
            `}</style>
        </>
    );
};

export default TrackNoteGroups;
