import { MutableRefObject } from "react";

import { SharpsAndFlatsInterface } from "./SharpsAndFlats";

namespace SharpsAndFlatsManager {
    let inputRef: MutableRefObject<SharpsAndFlatsInterface> = null;

    export function setRef(ref: MutableRefObject<SharpsAndFlatsInterface>) {
        inputRef = ref;
    }

    export function isFocusedOnInputs(): boolean {
        // #QUESTION will the inputRef ever be null here?
        // Will this function be called before our DOM is ready and our <SharpsAndFlats/> component is available?
        // I think it shouldn't be null if we call the useRef before the useEffect in our AppContainer.tsx
        console.log(`isFocusedOnInputs: SharpsAndFlats inputRef is ${inputRef}`);
        if (inputRef.current) {
            return inputRef.current.hasFocus();
        } else {
            return false;
        }
    }
    function getSharps(): string {
        console.log(`getSharps: SharpsAndFlats inputRef is ${inputRef}`);
        if (inputRef.current) {
            console.log("Current Sharps: " + inputRef.current.getSharps());
            return inputRef.current.getSharps();
        } else {
            return "";
        }
    }

    function getFlats(): string {
        console.log(`getFlats: SharpsAndFlats inputRef is ${inputRef}`);
        if (inputRef.current) {
            console.log("Current Flats: " + inputRef.current.getFlats());
            return inputRef.current.getFlats();
        } else {
            return "";
        }
    }

    // Returns true if the passed in noteLabel matches our list of sharps.
    export function isNoteSharp(noteLabel: string): boolean {
        // Case insensitive test. Does the list of sharps contain the noteLabel?
        return new RegExp(noteLabel, "i").test(getSharps());
    }

    // Returns true if the passed in noteLabel matches our list of flats.
    export function isNoteFlat(noteLabel: string): boolean {
        // Case insensitive test. Does the list of flats contain the noteLabel?
        return new RegExp(noteLabel, "i").test(getFlats());
    }
}

export default SharpsAndFlatsManager;
