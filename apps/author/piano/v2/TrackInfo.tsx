import PianoAuthorV2 from "apps/author/piano/v2/App";
import classNames from "classnames";

const Song = PianoAuthorV2.Song;

type Props = {
    currTrackNumber: number;
    currTrackIsHighlighted: boolean;
};

const TrackInfo = ({ currTrackNumber, currTrackIsHighlighted }: Props) => {
    const trackInfoClasses = classNames("track-info", { highlight: currTrackIsHighlighted });
    const isEmpty = Song.isTrackEmpty(currTrackNumber);
    const numNoteGroups = Song.getNumNoteGroupsInTrack(currTrackNumber);
    return (
        <>
            <div id={`track-${currTrackNumber}-info`} className={trackInfoClasses}>
                {isEmpty ? "" : numNoteGroups}
            </div>
            <style jsx>{`
                .track-info.highlight {
                    border-bottom: 1px solid rgba(238, 119, 153, 0.4);
                }
            `}</style>
        </>
    );
};

export default TrackInfo;
