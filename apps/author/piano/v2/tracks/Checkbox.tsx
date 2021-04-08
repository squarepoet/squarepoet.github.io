import Constants from "apps/shared/Constants";
import Actions from "apps/shared/redux/Actions";
import StorageUtils from "apps/shared/StorageUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "store2";

const Keys = Constants.StoreKeys;

const TrackCheckbox = ({ trackNumber }) => {
    // Save the UI checkbox state to localStorage.
    // The localStorage key is track-checkbox-n where n is the trackNumber.
    const storeKey = `track-checkbox-${trackNumber}`;
    const [getStoredCheckboxState, setStoredCheckboxState] = StorageUtils.storageHandlersForKey(storeKey, false);
    const setAndStoreCheckState = (checked: boolean) => {
        setChecked(checked);
        setStoredCheckboxState(checked);
    };
    const [checked, setChecked] = useState(getStoredCheckboxState());

    const dispatch = useDispatch();

    const onChange = (e) => {
        console.log("CHECKBOX UI CHANGED VALUE");
        const checkboxValue = e.target.checked;
        setAndStoreCheckState(checkboxValue);
        // Use redux to dispatch the checkbox changes....
        // checkbox N changed to true|false
        // The app can also dispatch changes to the checked state, which will be subscribed to here....
        const payload = {};
        payload[Keys.TRACK_NUMBER] = trackNumber;
        payload[Keys.CHECKBOX_VALUE] = checkboxValue;
        dispatch({ type: Actions.Toggle.onCheckboxChanged, payload: payload });
    };

    useEffect(() => {
        // #TODO: Figure this out!
        // PianoAuthorV2.Tracks.setTrackCheckedCallbacks(currTrackNumber, () => checked, setAndStoreCheckState);
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
                    height: 40px;
                    border: 0;
                    padding: 0;
                    margin: 0;
                    margin-right: 8px;
                }
            `}</style>
        </>
    );
};
export default TrackCheckbox;
