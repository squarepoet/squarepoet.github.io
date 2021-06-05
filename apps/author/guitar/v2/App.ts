import StringedInstrument from "apps/author/guitar/shared/StringedInstrument";
import Constants from "apps/shared/Constants";
import StorageUtils from "apps/shared/StorageUtils";
import store from "store2";

type AppHooks = {
    setInstrumentType: Function;
    setNumStrings: Function;
    setComputerKeyboardFretOffset: Function;
    setComputerKeyboardStringOffset: Function;
};

class State {
    private _computerKeyboardFretOffset: number = 0;
    private _computerKeyboardStringOffset: number = 0;
    private _maxStringOffset: number = 0;
    private _maxFretOffset: number = 0;

    get computerKeyboardFretOffset(): number {
        return this._computerKeyboardFretOffset;
    }

    get computerKeyboardStringOffset(): number {
        return this._computerKeyboardStringOffset;
    }

    /**
     * String Offsets
     *   There are 4 rows of labels.
     *   If there are 4 strings, we do not allow any changes.
     *   If there are 6 strings, we allow up to 2 rows worth of changes.
     * Fret Offsets
     *   There are 10 columns of labels.
     * @param stringedInstrument
     */
    setMaxOffsets(stringedInstrument: StringedInstrument): void {
        this._maxStringOffset = stringedInstrument.numStrings - 4;
        this._maxFretOffset = stringedInstrument.numFrets - 10;
    }

    setOffsets(stringOffset: number, fretOffset: number): void {
        this._computerKeyboardStringOffset = stringOffset;
        this._computerKeyboardFretOffset = fretOffset;
        // TODO: validate against the maxes
    }

    incrementComputerKeyboardStringOffset(): number {
        this._computerKeyboardStringOffset++;
        if (this._computerKeyboardStringOffset > this._maxStringOffset) {
            this._computerKeyboardStringOffset = this._maxStringOffset;
        }
        return this._computerKeyboardStringOffset;
    }

    decrementComputerKeyboardStringOffset(): number {
        this._computerKeyboardStringOffset--;
        if (this._computerKeyboardStringOffset < 0) {
            this._computerKeyboardStringOffset = 0;
        }
        return this._computerKeyboardStringOffset;
    }

    incrementComputerKeyboardFretOffset(): number {
        this._computerKeyboardFretOffset++;
        if (this._computerKeyboardFretOffset > this._maxFretOffset) {
            this._computerKeyboardFretOffset = this._maxFretOffset;
        }
        return this._computerKeyboardFretOffset;
    }

    decrementComputerKeyboardFretOffset(): number {
        this._computerKeyboardFretOffset--;
        if (this._computerKeyboardFretOffset < 0) {
            this._computerKeyboardFretOffset = 0;
        }
        return this._computerKeyboardFretOffset;
    }
}

// Matrix-style {row, col}.
// row starts at 0 and increments as we go down.
// column starts at 0 and increments as we go right.
interface GridPosition {
    row: number;
    col: number;
}

const computerKeyRowCol: Record<string, GridPosition> = {
    Digit1: { row: 0, col: 0 },
    Digit2: { row: 0, col: 1 },
    Digit3: { row: 0, col: 2 },
    Digit4: { row: 0, col: 3 },
    Digit5: { row: 0, col: 4 },
    Digit6: { row: 0, col: 5 },
    Digit7: { row: 0, col: 6 },
    Digit8: { row: 0, col: 7 },
    Digit9: { row: 0, col: 8 },
    Digit0: { row: 0, col: 9 },

    KeyQ: { row: 1, col: 0 },
    KeyW: { row: 1, col: 1 },
    KeyE: { row: 1, col: 2 },
    KeyR: { row: 1, col: 3 },
    KeyT: { row: 1, col: 4 },
    KeyY: { row: 1, col: 5 },
    KeyU: { row: 1, col: 6 },
    KeyI: { row: 1, col: 7 },
    KeyO: { row: 1, col: 8 },
    KeyP: { row: 1, col: 9 },

    KeyA: { row: 2, col: 0 },
    KeyS: { row: 2, col: 1 },
    KeyD: { row: 2, col: 2 },
    KeyF: { row: 2, col: 3 },
    KeyG: { row: 2, col: 4 },
    KeyH: { row: 2, col: 5 },
    KeyJ: { row: 2, col: 6 },
    KeyK: { row: 2, col: 7 },
    KeyL: { row: 2, col: 8 },
    Semicolon: { row: 2, col: 9 },

    KeyZ: { row: 3, col: 0 },
    KeyX: { row: 3, col: 1 },
    KeyC: { row: 3, col: 2 },
    KeyV: { row: 3, col: 3 },
    KeyB: { row: 3, col: 4 },
    KeyN: { row: 3, col: 5 },
    KeyM: { row: 3, col: 6 },
    Comma: { row: 3, col: 7 },
    Period: { row: 3, col: 8 },
    Slash: { row: 3, col: 9 },
};

const guitarStringToPianoKeyNumber: Record<number, number> = {
    1: 44, // high e string
    2: 39, // B
    3: 35, // G
    4: 30, // D
    5: 25, // A
    6: 20, // low E string
};

// The true app state is stored in here.
// React's useState may duplicate some of this data, to apply changes to the DOM.
// Why do we do it this way?
// React's setXXX() functions that we get from useState() are asynchronous.
// I ran into bugs where I depended on setXXX() to apply the state change immediately.
// Instead, I would rather apply the changes here, and then rely on the asynchronous setXXX() to change the DOM eventually.
namespace App {
    let stringedInstrument: StringedInstrument = null;
    let hooks: AppHooks; // Allows us to update the DOM from here.

    export const state = new State();

    const [getStoredInstrumentType, setStoredInstrumentType] = StorageUtils.storageHandlersForKey(Constants.StoreKeys.GUITAR_TYPE, Constants.Instrument.GUITAR);
    const [getStoredFretOffset, setStoredFretOffset] = StorageUtils.storageHandlersForKey(Constants.StoreKeys.GUITAR_FRET_OFFSET, 0);
    const [getStoredStringOffset, setStoredStringOffset] = StorageUtils.storageHandlersForKey(Constants.StoreKeys.GUITAR_STRING_OFFSET, 0);

    export function setHooks(obj: AppHooks) {
        hooks = obj;
    }

    export function loadFromLocalStorage() {
        updateInstrument(getStoredInstrumentType());
        state.setOffsets(getStoredStringOffset(), getStoredFretOffset());
        updateDOM();
    }

    export function setInstrumentType(instrumentType: string) {
        updateInstrument(instrumentType); // the parameter is validated and stored into stringedInstrument.type
        updateDOM();
        setStoredInstrumentType(stringedInstrument.type);
    }

    function updateInstrument(instrumentType: string) {
        stringedInstrument = new StringedInstrument(instrumentType);
        state.setMaxOffsets(stringedInstrument);
    }

    function updateDOM() {
        hooks.setInstrumentType(stringedInstrument.type);
        hooks.setNumStrings(stringedInstrument.numStrings);
        hooks.setComputerKeyboardStringOffset(state.computerKeyboardStringOffset);
        hooks.setComputerKeyboardFretOffset(state.computerKeyboardFretOffset);
    }

    export function onKeyDown(e: KeyboardEvent) {
        if (e.code in computerKeyRowCol) {
            const { row, col } = computerKeyRowCol[e.code];
            const string = row + state.computerKeyboardStringOffset + 1; // Guitar strings are numbered 1 through 6.
            const fret = col + state.computerKeyboardFretOffset; // Guitar frets are numbered starting from 0 (open string).
            const pianoKeyNumber = guitarStringToPianoKeyNumber[string] + fret;
            console.log("Play " + pianoKeyNumber + "  at string: " + string + " fret: " + fret);
        } else {
            switch (e.code) {
                case "ArrowUp": {
                    const offset = state.decrementComputerKeyboardStringOffset();
                    setStoredStringOffset(offset);
                    hooks.setComputerKeyboardStringOffset(offset);
                    break;
                }
                case "ArrowDown": {
                    const offset = state.incrementComputerKeyboardStringOffset();
                    setStoredStringOffset(offset);
                    hooks.setComputerKeyboardStringOffset(state.computerKeyboardStringOffset);
                    break;
                }
                case "ArrowLeft": {
                    const offset = state.decrementComputerKeyboardFretOffset();
                    setStoredFretOffset(offset);
                    hooks.setComputerKeyboardFretOffset(state.computerKeyboardFretOffset);
                    break;
                }
                case "ArrowRight": {
                    const offset = state.incrementComputerKeyboardFretOffset();
                    setStoredFretOffset(offset);
                    hooks.setComputerKeyboardFretOffset(state.computerKeyboardFretOffset);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
}

export default App;
