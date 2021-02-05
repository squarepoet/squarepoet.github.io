import {
    ChangeEvent, FocusEvent, forwardRef, KeyboardEvent, useImperativeHandle, useRef
} from "react";
import createPersistedState from "use-persisted-state";

// TODO: Learn about controlled vs uncontrolled components.
// https://reactjs.org/docs/uncontrolled-components.html
//
// forwardRef and useImperativeHandle are two React features that allow us to interact with the <input> element's focus.
type Props = {
    label: string;
    persistedStateKey: string; // e.g., "sharps" | "flats"
};

type InputSavedInterface = {
    hasFocus(): boolean;
    getValue(): string;
};

const InputSaved = forwardRef(({ label, persistedStateKey }: Props, ref) => {
    // Instead of React's default useState(), we use a different function that saves to localstorage.
    const useInputState = createPersistedState(persistedStateKey);
    const [inputElementValue, setInputElementValue] = useInputState("");
    const inputElementRef = useRef();

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(`InputSaved: onKeyDown key = ${e.key} | code = ${e.code}`);
        console.dir(localStorage);
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(`InputSaved: onKeyUp key = ${e.key} | code = ${e.code}`);
        setInputElementValue((e.target as HTMLInputElement).value.toUpperCase().replace(/[^ABCDEFG]+/g, ""));
        console.dir(localStorage);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("InputSaved: onChange");
        setInputElementValue(e.target.value.toUpperCase().replace(/[^ABCDEFG]+/g, ""));
        console.dir(localStorage);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        console.log("InputSaved: onBlur");
        console.dir(localStorage);
    };

    // Expose methods to our parent
    // The parent can access through the ref they pass into this component.
    useImperativeHandle(ref, () => {
        return {
            hasFocus() {
                return inputElementRef.current === document.activeElement;
            },
            getValue() {
                return inputElementValue;
            },
        };
    });

    return (
        <>
            <div>
                {label} &nbsp;
                <input ref={inputElementRef} value={inputElementValue} onChange={onChange} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onBlur={onBlur} />
            </div>
            <style jsx>{`
                div {
                    display: block;
                }
                input {
                    background-color: #444;
                    appearance: none;
                    border: 1px solid #222;
                    padding: 4px;
                    width: 100px;
                    color: #ddd;
                }
            `}</style>
        </>
    );
});

export default InputSaved;
export type { InputSavedInterface };
