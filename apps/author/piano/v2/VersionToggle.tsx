import Actions from "apps/shared/redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
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
    const v1Classes = ["version-toggle"];
    const v2Classes = ["version-toggle"];
    switch (songVersion) {
        case 1:
        default:
            v1Classes.push("selected");
            break;
        case 2:
            v2Classes.push("selected");
            break;
    }

    return (
        <>
            <div className="version-div">
                <div className={v1Classes.join(" ")} id="toggle_v1" onClick={onV1Clicked}>
                    V1
                </div>
                <div className={v2Classes.join(" ")} id="toggle_v2" onClick={onV2Clicked}>
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
export default Page;
