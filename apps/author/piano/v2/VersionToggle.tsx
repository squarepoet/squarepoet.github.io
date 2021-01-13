import Actions from "apps/shared/redux/Actions";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

const VersionToggleComponent = () => {
    const dispatch = useDispatch();
    const songVersion = useSelector((state) => state.songVersion);

    function onV1Clicked() {
        dispatch({ type: Actions.Toggle.SongVersionFormat, payload: { songVersion: 1 } });
    }

    function onV2Clicked() {
        dispatch({ type: Actions.Toggle.SongVersionFormat, payload: { songVersion: 2 } });
    }

    // TODO: Use classNames library.
    // https://github.com/JedWatson/classnames
    const v1Classes = classNames("version-toggle", { selected: songVersion === 1 });
    const v2Classes = classNames("version-toggle", { selected: songVersion === 2 });

    return (
        <>
            <div className="version-div">
                <div className={v1Classes} id="toggle_v1" onClick={onV1Clicked}>
                    V1
                </div>
                <div className={v2Classes} id="toggle_v2" onClick={onV2Clicked}>
                    V2
                </div>
            </div>
            <style jsx>{`
                .version-div {
                    float: left;
                    margin-left: 8px;
                }

                .version-toggle {
                    float: left;
                    background-color: #eee;
                    color: #ccc;
                    padding: 3px 15px;
                    cursor: pointer;
                }

                .version-toggle.selected {
                    color: #333;
                    background-color: #cdedff;
                }
            `}</style>
        </>
    );
};
export default VersionToggleComponent;
