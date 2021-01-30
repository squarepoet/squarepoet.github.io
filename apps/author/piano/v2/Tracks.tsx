import PianoAuthorV2 from "apps/author/piano/v2/App";
import Constants from "apps/shared/Constants";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Song = PianoAuthorV2.Song;
const Keys = Constants.StoreKeys;

// #TODO: There has to be a more efficient way to only update the tracks we need to update,
// instead of triggering the whole re-render due to the change in updatedTracksTimestamp.

const Tracks = () => {
    const [numTracks, setNumTracks] = useState(1);

    const updatedTrackNumbers = useSelector((state) => state[Keys.UPDATED_TRACKS_LIST]);
    const updatedTracksTimestamp = useSelector((state) => state[Keys.UPDATED_TRACKS_TIMESTAMP]);
    useEffect(() => {
        console.log(`Tracks updated at ${updatedTracksTimestamp}. Need to rerender tracks: ${updatedTrackNumbers}`);
    }, [updatedTrackNumbers, updatedTracksTimestamp]);

    function getTracks() {
        const tracks = [];
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            const numNoteGroups = Song.getNumNoteGroupsInTrack(trackNumber);
            const isEmpty = numNoteGroups === 0;
            const trackContainerClasses = classNames("track-container", { empty: isEmpty });

            const noteGroups = [];
            for (let n = 0; n < numNoteGroups; n++) {
                const noteGroup = Song.getNoteGroupFromTrack(n, trackNumber);
                const noteGroupClasses = classNames("notegroup", { multiple: noteGroup.numNotes > 1 });
                const noteGroupID = Song.getNoteGroupID(trackNumber, n); // t_0_n_0 stands for track 0 notegroup 0
                const noteGroupDIV = (
                    <div key={noteGroupID} id={noteGroupID} className={noteGroupClasses}>
                        {noteGroup.toString()}
                    </div>
                );
                noteGroups.push(noteGroupDIV);
            }

            const containerID = `track-${trackNumber}-container`;
            const trackContainerDIV = (
                <div key={containerID} id={containerID} className={trackContainerClasses} last-update={updatedTracksTimestamp}>
                    <input id={`track-${trackNumber}-checkbox`} type="checkbox" className="checkbox" />
                    <div id={`track-${trackNumber}-info`} className="track-info">
                        {isEmpty ? "" : numNoteGroups}
                    </div>
                    <div id={`track-${trackNumber}`} className="track">
                        {noteGroups}
                    </div>
                </div>
            );

            tracks.push(trackContainerDIV);
        }
        return tracks;
    }

    return (
        <>
            <div id="tracks">{getTracks()}</div>
        </>
    );
};
export default Tracks;
