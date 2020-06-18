import { useState } from "react";
import createPersistedState from "use-persisted-state";

const useTestState = createPersistedState("test_state");

export default () => {
    const [inputValue, setInputValue] = useTestState("");

    let handleClick = (e) => {
    };

    let onInputChanged = (e) => {
    };

    let onKeyUp = (e) => {
    };

    return (
        <>
            <button onClick={handleClick}>CLICK ME</button>
            <br />
            <input value={inputValue} onChange={onInputChanged} onKeyUp={onKeyUp}></input>
        </>
    );
};
