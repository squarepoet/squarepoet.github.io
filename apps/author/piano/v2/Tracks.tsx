import PianoAuthorV2 from "apps/author/piano/v2/App";
import classNames from "classnames";
import { useState } from "react";

const Tracks = () => {
    const [numTracks, setNumTracks] = useState(1);

    function getTracks() {
        console.log(PianoAuthorV2.Song);

        const tracks = [];
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            const numNoteGroups = PianoAuthorV2.Song.getNumNoteGroupsInTrack(trackNumber);
            const isEmpty = numNoteGroups === 0;
            const trackContainerClasses = classNames("track-container", { empty: isEmpty });

            const noteGroups = [];
            for (let n = 0; n < numNoteGroups; n++) {
                const noteGroup = PianoAuthorV2.Song.getNoteGroupFromTrack(n, trackNumber);
                const noteGroupClasses = classNames("notegroup", { multiple: noteGroup.numNotes > 1 });
                const noteGroupID = PianoAuthorV2.Song.getNoteGroupID(trackNumber, n); // t_0_n_0 stands for track 0 notegroup 0
                noteGroups.push(
                    <div id={noteGroupID} className={noteGroupClasses}>
                        {noteGroup.toString()}
                    </div>
                );
            }

            tracks.push(
                <div id={`track-${trackNumber}-container`} className={trackContainerClasses}>
                    <input id={`track-${trackNumber}-checkbox`} type="checkbox" className="checkbox" />
                    <div id={`track-${trackNumber}-info`} className="track-info">
                        {isEmpty ? "" : numNoteGroups}
                    </div>
                    <div id={`track-${trackNumber}`} className="track">
                        {noteGroups}
                    </div>
                </div>
            );
        }
        return tracks;
    }

    return (
        <>
            <div id="tracks">{getTracks()}</div>
            <style jsx>{`
                div {
                    border: 3px solid red;
                }
            `}</style>
        </>
    );
};
export default Tracks;
