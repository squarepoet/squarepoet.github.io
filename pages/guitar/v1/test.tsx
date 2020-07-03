import { useState } from "react";
import createPersistedState from "use-persisted-state";

const useTestState = createPersistedState("test_state");

export default () => {
    const [inputValue, setInputValue] = useTestState("");

    let handleClick = (e) => {
        console.log("handleClick");
    };

    let onInputChanged = (e) => {
        console.log("onInputChanged");
    };

    let onKeyUp = (e) => {
        console.log("onKeyUp");
    };

    return (
        <>
            <button onClick={handleClick}>CLICK ME</button>
            <br />
            <input value={inputValue} onChange={onInputChanged} onKeyUp={onKeyUp}></input>
        </>
    );
};
