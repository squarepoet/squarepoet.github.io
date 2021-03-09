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
    illegalCharactersRegExpStr?: string;
    placeholder?: string;
    onChange?: (val: string) => void;
};

type InputSavedInterface = {
    hasFocus(): boolean;
    getValue(): string;
};

const InputSaved = forwardRef((props: Props, ref) => {
    const { label, persistedStateKey, illegalCharactersRegExpStr, placeholder } = props;

    // Instead of React's default useState(), we use a different function that saves to localstorage.
    const useInputState = createPersistedState(persistedStateKey);
    const [inputElementValue, setInputElementValue] = useInputState("");
    const inputElementRef = useRef();

    let illegalCharacters = null;
    if (illegalCharactersRegExpStr) {
        illegalCharacters = new RegExp(illegalCharactersRegExpStr, "g");
    } else {
        // Default to accepting ONLY ABCDEFG
        illegalCharacters = /[^ABCDEFG]+/g; // Anything that is NOT ABCDEFG will be eliminated!
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(`InputSaved: onKeyDown key = ${e.key} | code = ${e.code}`);
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(`InputSaved: onKeyUp key = ${e.key} | code = ${e.code}`);
        // setInputElementValue((e.target as HTMLInputElement).value.toUpperCase().replace(illegalCharacters, ""));

        // ESC or Enter to commit changes and remove focus from this element.
        if (e.code === "Escape" || e.code === "Enter") {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        } else {
            // console.log(e.code);
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("InputSaved: onChange");
        const val = e.target.value.toUpperCase().replace(illegalCharacters, "");
        setInputElementValue(val);
        if (props.onChange) {
            props.onChange(val);
        }
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        console.log("InputSaved: onBlur");
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
                <label>
                    {label} <input ref={inputElementRef} value={inputElementValue} onChange={onChange} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onBlur={onBlur} placeholder={placeholder} />
                </label>
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
