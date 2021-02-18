import StringedInstrument from "apps/author/guitar/shared/StringedInstrument";
import Constants from "apps/shared/Constants";

type AppHooks = {
    setInstrumentType: Function;
    setNumStrings: Function;
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

    export function setHooks(obj: AppHooks) {
        hooks = obj;
    }

    export function loadFromLocalStorage() {
        const instrumentType = localStorage.getItem(Constants.StoreKeys.INSTRUMENT_TYPE);
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
        hooks.setInstrumentType(stringedInstrument.type);
        hooks.setNumStrings(stringedInstrument.numStrings);
    }
}

export default App;
