import {
    ChangeEvent, FocusEvent, forwardRef, KeyboardEvent, useImperativeHandle, useRef
} from "react";
import createPersistedState from "use-persisted-state";

// TODO: Learn about controlled vs uncontrolled components.
// https://reactjs.org/docs/uncontrolled-components.html
const InputSaved = forwardRef((props: any, ref) => {
    const label: string = props.label;
    const key: string = props.persistedStateKey; // sharps | flats

    const useState = createPersistedState(key);
    const [value, setValue] = useState("");

    const inputElementRef = useRef();

    // BUG
    // CMD+A, BACKSPACE|DELETE
    // MOUSE_SELECT_ALL, BACKSPACE|DELETE
    //

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log("onKeyDown " + e.code);
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log("onKeyUp " + e.code);
        // DETECT situations where the current input element is empty!
        setValue((e.target as HTMLInputElement).value.toUpperCase().replace(/[^ABCDEFG]+/g, ""));
    };

    // CMD + A, BACKSPACE/FORWARD_DELETE does not trigger an onChange().
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("onChange");
        setValue(e.target.value.toUpperCase().replace(/[^ABCDEFG]+/g, ""));
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        console.log("onBlur");
    };

    // Exposes a hasFocus() method to parents who have our ref.
    useImperativeHandle(ref, () => {
        return {
            hasFocus() {
                return inputElementRef.current === document.activeElement;
            },
            getValue() {
                return value;
            },
        };
    });

    return (
        <>
            <div>
                {label} &nbsp;
                <input ref={inputElementRef} value={value} onChange={onChange} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onBlur={onBlur} />
            </div>
            <style jsx>{`
                div {
                    display: block;
                }
            `}</style>
        </>
    );
});

export default InputSaved;
