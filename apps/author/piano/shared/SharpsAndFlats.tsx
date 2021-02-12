import InputSaved, { InputSavedInterface } from "components/InputSaved";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

// Accept CSS via props.style to allow the parent component to customize this component.
// For example:
//      float: ("right" | "left");

// Used by Piano Author V1 and V2.

type SharpsAndFlatsInterface = {
    hasFocus(): boolean;
    getSharps(): string;
    getFlats(): string;
};

const SharpsAndFlatsInputs = forwardRef((props: any, ref) => {
    const sharpsInput = useRef<InputSavedInterface>();
    const flatsInput = useRef<InputSavedInterface>();

    // Expose a .hasFocus() method to any parent that has a ref to us.
    // Return true if either of our input elements has the current focus.
    useImperativeHandle(ref, () => {
        return {
            hasFocus() {
                if (sharpsInput.current && sharpsInput.current.hasFocus()) {
                    return true;
                } else if (flatsInput.current && flatsInput.current.hasFocus()) {
                    return true;
                } else {
                    return false;
                }
            },
            getSharps() {
                if (sharpsInput.current) {
                    const sharpsValue = sharpsInput.current.getValue();
                    console.log("SHARPS VALUE " + sharpsValue);
                    return sharpsValue;
                } else {
                    return "";
                }
            },
            getFlats() {
                if (flatsInput.current) {
                    const flatsValue = flatsInput.current.getValue();
                    console.log("FLATS VALUE " + flatsValue);
                    return flatsValue;
                } else {
                    return "";
                }
            },
        };
    });

    return (
        <>
            <div className="sharps-and-flats" style={props.style}>
                <InputSaved ref={sharpsInput} label="sharps" persistedStateKey="piano_sharps" />
                <InputSaved ref={flatsInput} label="flats" persistedStateKey="piano_flats" />
            </div>
            <style jsx>{`
                div.sharps-and-flats {
                    margin-right: 20px;
                    text-align: right;
                }
                input {
                    width: 150px;
                }
            `}</style>
        </>
    );
});

export default SharpsAndFlatsInputs;
export type { SharpsAndFlatsInterface };
