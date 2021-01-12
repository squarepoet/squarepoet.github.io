import { useDispatch, useSelector } from "react-redux";
import useInterval from "react-useinterval";

const Page = () => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch({
            type: "RESET",
        });
    };

    useInterval(() => {
        dispatch({
            type: "INCREMENT",
        });
    }, 1000);

    // THE IMPORTANT THING ABOUT THIS TEST IS...
    // useSelector and dispatch can be on DIFFERENT PAGES.
    // They will interact with the SAME STORE!
    const count = useSelector((state) => state.count);

    return (
        <>
            <p>Counter should increment automatically.</p>
            <div>{count}</div>
            <button onClick={handleClick}>CLICK ME</button>
        </>
    );
};

export default Page;
