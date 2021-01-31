import PianoAuthorV2 from "apps/author/piano/v2/App";
import Constants from "apps/shared/Constants";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Song = PianoAuthorV2.Song;
const Keys = Constants.StoreKeys;

// #TODO: There has to be a more efficient way to only update the tracks we need to update,
// instead of triggering the whole re-render due to the change in updatedTracksTimestamp.

type Props = {
    higlightedTrackNumber: number;
    highlightedNoteGroupNumber: number;
};

const Tracks = ({ higlightedTrackNumber, highlightedNoteGroupNumber }: Props) => {
    const [numTracks, setNumTracks] = useState(1);

    const updatedTrackNumbers = useSelector((state) => state[Keys.UPDATED_TRACKS_LIST]);
    const updatedTracksTimestamp = useSelector((state) => state[Keys.UPDATED_TRACKS_TIMESTAMP]);
    useEffect(() => {
        console.log(`Tracks updated at ${updatedTracksTimestamp}. Need to rerender tracks: ${updatedTrackNumbers}`);
    }, [updatedTrackNumbers, updatedTracksTimestamp]);

    function getTracks() {
        const tracks = [];
        for (let currTrackNumber = 0; currTrackNumber < numTracks; currTrackNumber++) {
            const numNoteGroups = Song.getNumNoteGroupsInTrack(currTrackNumber);
            const isEmpty = numNoteGroups === 0;
            const currTrackIsHighlighted = higlightedTrackNumber == currTrackNumber;
            const trackContainerClasses = classNames("track-container", { empty: isEmpty });

            const noteGroups = [];
            for (let n = 0; n < numNoteGroups; n++) {
                const noteGroup = Song.getNoteGroupFromTrack(n, currTrackNumber);
                const noteGroupClasses = classNames("notegroup", { multiple: noteGroup.numNotes > 1, highlight: currTrackIsHighlighted && highlightedNoteGroupNumber == n });
                const noteGroupID = Song.getNoteGroupID(currTrackNumber, n); // t_0_n_0 stands for track 0 notegroup 0
                const noteGroupDIV = (
                    <div key={noteGroupID} id={noteGroupID} className={noteGroupClasses}>
                        {noteGroup.toString()}
                    </div>
                );
                noteGroups.push(noteGroupDIV);
            }

            const trackClasses = classNames("track", { highlight: currTrackIsHighlighted });
            const trackInfoClasses = classNames("track-info", { highlight: currTrackIsHighlighted });

            const containerID = `track-${currTrackNumber}-container`;
            const trackContainerDIV = (
                <div key={containerID} id={containerID} className={trackContainerClasses} last-update={updatedTracksTimestamp}>
                    <input id={`track-${currTrackNumber}-checkbox`} type="checkbox" className="checkbox" />
                    <div id={`track-${currTrackNumber}-info`} className={trackInfoClasses}>
                        {isEmpty ? "" : numNoteGroups}
                    </div>
                    <div id={`track-${currTrackNumber}`} className={trackClasses}>
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
            <style jsx global>{`
                .track.highlight {
                    border-bottom: 1px solid rgba(238, 119, 153, 0.4);
                }

                .track-info.highlight {
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
export default Tracks;
