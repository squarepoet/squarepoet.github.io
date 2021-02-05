import PianoAuthorV2 from "apps/author/piano/v2/App";
import TrackCheckbox from "apps/author/piano/v2/tracks/Checkbox";
import TrackInfo from "apps/author/piano/v2/tracks/Info";
import NoteGroupContainer from "apps/author/piano/v2/tracks/NoteGroupContainer";
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

// Contains multiple Tracks, which each consist of:
// 1) a checkbox
// 2) a info box showing how many notegroups there are in this track
// 3) a container for all the notegroups.
const TrackContainer = ({ highlightedTrackNumber, highlightedNoteGroupNumber }: Props) => {
    const updatedTracksTimestamp = useSelector((state) => state[Keys.UPDATED_TRACKS_TIMESTAMP]);

    // const updatedTrackNumbers = useSelector((state) => state[Keys.UPDATED_TRACKS_LIST]);
    //
    // useEffect(() => {
    //     console.log(`Tracks updated at ${updatedTracksTimestamp}. Need to rerender tracks: ${updatedTrackNumbers}`);
    //     console.log("XXXXXXXXX");
    // }, [updatedTrackNumbers, updatedTracksTimestamp]);

    const numTracks = Song.getNumTracks();
    const tracks = [];
    for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
        const isEmpty = Song.isTrackEmpty(trackNumber);
        const isHighlighted = highlightedTrackNumber == trackNumber;
        const classes = classNames("track", { empty: isEmpty, highlighted: isHighlighted });
        const trackKey = `track-${trackNumber}`;
        const _highlightedNoteGroupNumber = isHighlighted ? highlightedNoteGroupNumber : -1; // Just pass in -1 if the current track is not highlighted.
        tracks.push(
            <div key={trackKey} id={trackKey} className={classes} last-update={updatedTracksTimestamp}>
                <TrackCheckbox trackNumber={trackNumber} />
                <TrackInfo trackNumber={trackNumber} trackIsHighlighted={isHighlighted} />
                <NoteGroupContainer trackNumber={trackNumber} highlightedNoteGroupNumber={_highlightedNoteGroupNumber} />
            </div>
        );
    }

    return (
        <>
            <div className="track-container">{tracks}</div>
            <style jsx global>{`
                .track-container {
                    margin-bottom: 40px;
                    box-sizing: border-box;
                    font-family: Inconsolata, Menlo, Monaco, sans-serif;
                }

                .track {
                    height: 48px;
                    box-sizing: border-box;
                    padding-top: 3px;
                }

                .track.empty {
                    /* Make the track shorter, like 22px? */
                }

                .track.highlighted {
                    /* Add a glow around the track. */
                    background-color: #333;
                }
            `}</style>
        </>
    );
};
export default TrackContainer;
