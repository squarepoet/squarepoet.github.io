import PianoAuthorV2 from "apps/author/piano/v2/App";
import classNames from "classnames";

type Props = {
    trackNumber: number;
    noteGroupNumber: number;
    isHighlighted: boolean;
};

const Song = PianoAuthorV2.Song;

const NoteGroup = ({ trackNumber, noteGroupNumber, isHighlighted }: Props) => {
    const noteGroup = Song.getNoteGroupFromTrack(noteGroupNumber, trackNumber);
    const containsMultipleNotes = noteGroup.numNotes > 1;
    const classes = classNames("notegroup", { multiple: containsMultipleNotes, highlight: isHighlighted });
    const keyAndID = Song.getNoteGroupID(trackNumber, noteGroupNumber); // t_0_n_0 stands for track 0 notegroup 0

    return (
        <>
            <div key={keyAndID} id={keyAndID} className={classes}>
                {noteGroup.toString()}
            </div>
        </>
    );
};

export default NoteGroup;
