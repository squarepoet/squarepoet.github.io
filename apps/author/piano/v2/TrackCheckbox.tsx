import PianoAuthorV2 from "apps/author/piano/v2/App";
import { useEffect, useRef, useState } from "react";

const TrackCheckbox = ({ currTrackNumber }) => {
    const [checked, setChecked] = useState(false);

    const onChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        PianoAuthorV2.Tracks.setTrackCheckedCallbacks(currTrackNumber, () => checked, setChecked);
    }, []);

    return (
        <>
            <input id={`track-${currTrackNumber}-checkbox`} type="checkbox" className="checkbox" onChange={onChange} checked={checked} />
        </>
    );
};
export default TrackCheckbox;
