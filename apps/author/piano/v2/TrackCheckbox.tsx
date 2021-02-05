import PianoAuthorV2 from "apps/author/piano/v2/App";
import Constants from "apps/shared/Constants";
import Actions from "apps/shared/redux/Actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import createPersistedState from "use-persisted-state";

const Keys = Constants.StoreKeys;

const TrackCheckbox = ({ trackNumber }) => {
    // Save the checkbox state to localStorage.
    // The persisted key should be track-checkbox-n
    const useCheckboxState = createPersistedState(`track-checkbox-${trackNumber}`);
    const [checked, setChecked] = useCheckboxState(false);

    const dispatch = useDispatch();

    const onChange = (e) => {
        console.log("CHECKBOX UI CHANGED VALUE");
        const checkboxValue = e.target.checked;
        setChecked(checkboxValue);
        // Use redux to dispatch the checkbox changes....
        // checkbox N changed to true|false
        // The app can also dispatch changes to the checked state, which will be subscribed to here....
        const payload = {};
        payload[Keys.TRACK_NUMBER] = trackNumber;
        payload[Keys.CHECKBOX_VALUE] = checkboxValue;
        dispatch({ type: Actions.Toggle.onCheckboxChanged, payload: payload });
    };

    useEffect(() => {
        // PianoAuthorV2.Tracks.setTrackCheckedCallbacks(currTrackNumber, () => checked, setChecked);
    }, []);

    const checkboxMapping = useSelector((state) => {
        console.log("useSelector for checkboxMapping");
        console.log(state);
        return state[Keys.TRACK_NUMBER_TO_CHECKBOX_VALUE];
    });
    useEffect(() => {
        console.log("CHECKBOX MAPPING CHANGED");
        console.log(checkboxMapping);
    }, [checkboxMapping]);

    return (
        <>
            <input id={`track-${trackNumber}-checkbox`} type="checkbox" className="checkbox" onChange={onChange} checked={checked} />
            <style jsx>{`
                input {
                    box-sizing: border-box;
                    width: 20px;
                    height: 100%;
                    border: 0px;
                    padding: 0px;
                    margin: 0px;
                    margin-right: 6px;
                }
            `}</style>
        </>
    );
};
export default TrackCheckbox;
