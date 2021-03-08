import PianoAuthorV2 from "apps/author/piano/v2/App";
import Constants from "apps/shared/Constants";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NoteGroup.module.css";

type Props = {
    id: string;
    trackNumber: number;
    noteGroupNumber: number;
    isHighlighted: boolean;
};

const Song = PianoAuthorV2.Song;
const Keys = Constants.StoreKeys;

const NoteGroup = ({ id, trackNumber, noteGroupNumber, isHighlighted }: Props) => {
    const noteGroup = Song.getNoteGroupFromTrack(noteGroupNumber, trackNumber);

    // PROBABLY BAD PERFORMANCE!!!!
    const playedNoteGroupID = useSelector((state) => state[Keys.PLAYED_NOTEGROUP_ID]);
    const isPlayed = playedNoteGroupID == Song.getNoteGroupID(trackNumber, noteGroupNumber);

    const containsMultipleNotes = noteGroup.numNotes > 1;
    const classes = classNames("notegroup", { multiple: containsMultipleNotes, highlight: isHighlighted }, isPlayed ? styles.played : "");

    return (
        <>
            <div id={id} className={classes}>
                {noteGroup.toString()}
            </div>
        </>
    );
};

export default NoteGroup;
