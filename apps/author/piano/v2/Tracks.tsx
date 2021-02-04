import PianoAuthorV2 from "apps/author/piano/v2/App";
import TrackCheckbox from "apps/author/piano/v2/TrackCheckbox";
import TrackInfo from "apps/author/piano/v2/TrackInfo";
import TrackNoteGroups from "apps/author/piano/v2/TrackNoteGroups";
import Constants from "apps/shared/Constants";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Song = PianoAuthorV2.Song;
const Keys = Constants.StoreKeys;

// #TODO: There has to be a more efficient way to only update the tracks we need to update,
// instead of triggering the whole re-render due to the change in updatedTracksTimestamp.

type Props = {
    highlightedTrackNumber: number;
    highlightedNoteGroupNumber: number;
};

const Tracks = ({ highlightedTrackNumber, highlightedNoteGroupNumber }: Props) => {
    const updatedTrackNumbers = useSelector((state) => state[Keys.UPDATED_TRACKS_LIST]);
    const updatedTracksTimestamp = useSelector((state) => state[Keys.UPDATED_TRACKS_TIMESTAMP]);
    useEffect(() => {
        console.log(`Tracks updated at ${updatedTracksTimestamp}. Need to rerender tracks: ${updatedTrackNumbers}`);
    }, [updatedTrackNumbers, updatedTracksTimestamp]);

    function getTracks() {
        console.log("GET TRACKS");
        const tracks = [];
        const numTracks = PianoAuthorV2.Song.getNumTracks();
        for (let currTrackNumber = 0; currTrackNumber < numTracks; currTrackNumber++) {
            const isEmpty = Song.isTrackEmpty(currTrackNumber);
            const currTrackIsHighlighted = highlightedTrackNumber == currTrackNumber;
            const trackContainerClasses = classNames("track-container", { empty: isEmpty });
            const containerID = `track-${currTrackNumber}-container`;
            const trackContainerDIV = (
                <div key={containerID} id={containerID} className={trackContainerClasses} last-update={updatedTracksTimestamp}>
                    <TrackCheckbox currTrackNumber={currTrackNumber} />
                    <TrackInfo currTrackNumber={currTrackNumber} currTrackIsHighlighted={currTrackIsHighlighted} />
                    <TrackNoteGroups currTrackNumber={currTrackNumber} currTrackIsHighlighted={currTrackIsHighlighted} highlightedNoteGroupNumber={highlightedNoteGroupNumber} />
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
