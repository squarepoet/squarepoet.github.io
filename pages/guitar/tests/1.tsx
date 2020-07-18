// Test the use-persisted-state library. It saves state in localStorage.
// Test out how <input> tags work in React. I swear there's a bug in React where onChange isn't fired when you select all and delete.

import createPersistedState from "use-persisted-state";

const useTestState = createPersistedState("test_state");

export default () => {
    const [inputValue, setInputValue] = useTestState("");

    const handleClick = (e) => {
        console.log("button handleClick");
    };

    const onChange = (e) => {
        console.log("input onChanged");
    };

    const onKeyUp = (e) => {
        console.log("input onKeyUp");
    };

    return (
        <>
            <button onClick={handleClick}>CLICK ME</button>
            <br />
            <input value={inputValue} onChange={onChange} onKeyUp={onKeyUp}></input>
        </>
    );
};
