import StringedInstrument from "apps/author/guitar/shared/StringedInstrument";
import Constants from "apps/shared/Constants";

type AppHooks = {
    setInstrumentType: Function;
    setNumStrings: Function;
    setComputerKeyboardFretOffset: Function;
    setComputerKeyboardStringOffset: Function;
};

class State {
    private _computerKeyboardFretOffset: number = 0;
    private _computerKeyboardStringOffset: number = 0;

    public get computerKeyboardFretOffset(): number {
        return this._computerKeyboardFretOffset;
    }

    public get computerKeyboardStringOffset(): number {
        return this._computerKeyboardStringOffset;
    }

    public incrementComputerKeyboardStringOffset(max: number): void {
        this._computerKeyboardStringOffset++;
        if (this._computerKeyboardStringOffset > max) {
            this._computerKeyboardStringOffset = max;
        }
    }

    public decrementComputerKeyboardStringOffset(): void {
        this._computerKeyboardStringOffset--;
        if (this._computerKeyboardStringOffset < 0) {
            this._computerKeyboardStringOffset = 0;
        }
    }

    public incrementComputerKeyboardFretOffset(max: number): void {
        this._computerKeyboardFretOffset++;
        if (this._computerKeyboardFretOffset > max) {
            this._computerKeyboardFretOffset = max;
        }
    }

    public decrementComputerKeyboardFretOffset(): void {
        this._computerKeyboardFretOffset--;
        if (this._computerKeyboardFretOffset < 0) {
            this._computerKeyboardFretOffset = 0;
        }
    }
}

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

    export function setHooks(obj: AppHooks) {
        hooks = obj;
    }

    export function loadFromLocalStorage() {
        const instrumentType = localStorage.getItem(Constants.StoreKeys.GUITAR_TYPE);
        updateInstrument(instrumentType);
        updateDOM();
    }

    export function setInstrumentType(type: string) {
        const instrumentType = type;
        updateInstrument(instrumentType);
        updateDOM();
    }

    function updateInstrument(instrumentType: string) {
        stringedInstrument = new StringedInstrument(instrumentType);
    }

    function updateDOM() {
        console.log("Update DOM with this instrument:");
        console.log(stringedInstrument);
        hooks.setInstrumentType(stringedInstrument.type);
        hooks.setNumStrings(stringedInstrument.numStrings);
    }

    export function onKeyDown(e: KeyboardEvent) {
        console.log(e.code);
        switch (e.code) {
            case "ArrowUp": {
                state.decrementComputerKeyboardStringOffset();
                hooks.setComputerKeyboardStringOffset(state.computerKeyboardStringOffset);
                break;
            }
            case "ArrowDown": {
                // There are 4 rows of labels.
                // If there are 4 strings, we do not allow any changes.
                // If there are 6 strings, we allow up to 2 rows worth of changes.
                state.incrementComputerKeyboardStringOffset(stringedInstrument.numStrings - 4);
                hooks.setComputerKeyboardStringOffset(state.computerKeyboardStringOffset);
                break;
            }
            case "ArrowLeft": {
                state.decrementComputerKeyboardFretOffset();
                hooks.setComputerKeyboardFretOffset(state.computerKeyboardFretOffset);
                break;
            }
            case "ArrowRight": {
                // There are 10 columns of labels.
                state.incrementComputerKeyboardFretOffset(stringedInstrument.numFrets - 10);
                hooks.setComputerKeyboardFretOffset(state.computerKeyboardFretOffset);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export default App;
