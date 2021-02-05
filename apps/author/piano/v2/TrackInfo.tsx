import PianoAuthorV2 from "apps/author/piano/v2/App";
import classNames from "classnames";

const Song = PianoAuthorV2.Song;

type Props = {
    trackNumber: number;
    trackIsHighlighted: boolean;
};

const TrackInfo = ({ trackNumber, trackIsHighlighted }: Props) => {
    const trackInfoClasses = classNames({ highlight: trackIsHighlighted });
    const isEmpty = Song.isTrackEmpty(trackNumber);
    const numNoteGroups = Song.getNumNoteGroupsInTrack(trackNumber);
    return (
        <>
            <div id={`track-${trackNumber}-info`} className={trackInfoClasses}>
                {isEmpty ? "" : numNoteGroups}
            </div>
            <style jsx>{`
                div {
                    box-sizing: border-box;
                    width: 38px;
                    height: 100%;
                    background-color: #f0f4ff;
                    color: #666;
                    text-align: center;
                    font-size: 10pt;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    white-space: nowrap;
                    margin: 0 0;
                    display: inline-block;
                    line-height: 40px;
                }

                div.highlight {
                    background-color: #cfeaeb;
                }
            `}</style>
        </>
    );
};

export default TrackInfo;
