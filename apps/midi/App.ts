import Constants from "apps/shared/Constants";
import ComputerKeyboardMusicInput from "apps/shared/midi/ComputerKeyboardMusicInput";
import LUMIKeys from "apps/shared/midi/LUMIKeys";
import MIDIControllerIO from "apps/shared/midi/MIDIControllerIO";
import Instrument, { InstrumentType, validateInstrumentType } from "apps/shared/sound/Instrument";
import store from "store2";

namespace App {
    const midiEventsLogArray = [];
    const lumiEventsLogArray = [];

    let setDeviceList: (string) => void = null;
    let setMIDIEventsLog: (string) => void = null;
    let setLUMIEventsLog: (string) => void = null;
    let setSelectedInstrument: (string) => void = null;

    let soundOutput: Instrument = null;

    export function start() {
        const savedInstrument = validateInstrumentType(store.get(Constants.StoreKeys.PIANO_TYPE));
        setSelectedInstrument(savedInstrument);

        const listenerForStartingWebAudio = (e) => {
            removeListenersForStartingWebAudio();
            startMIDIControllerIOWithSavedInstrument();
            setMIDIEventsLog("Press some keys on your MIDI device to play sounds.");
        };

        const addListenersForStartingWebAudio = () => {
            window.addEventListener("keydown", listenerForStartingWebAudio);
            document.addEventListener("touchstart", listenerForStartingWebAudio);
            document.addEventListener("mousedown", listenerForStartingWebAudio);
        };

        const removeListenersForStartingWebAudio = () => {
            window.removeEventListener("keydown", listenerForStartingWebAudio);
            document.removeEventListener("touchstart", listenerForStartingWebAudio);
            document.removeEventListener("mousedown", listenerForStartingWebAudio);
        };

        // Make sure we call it!
        addListenersForStartingWebAudio();

        const startMIDIControllerIOWithSavedInstrument = () => {
            MIDIControllerIO.start();
            setInstrument(savedInstrument);
            ComputerKeyboardMusicInput.registerKeyHandlersForElement(document.getElementById("computerKeyboardInputElement"));
        };

        // Print a color message to the console.
        console.log("%cHello MIDI 🎹", "color:yellow;font-size:22px;font-weight:bold;background:black;");

        // Add some info to the informational text area.
        setMIDIEventsLog("Tap/Click here to connect to your MIDI device.");
        setLUMIEventsLog("Connect your LUMI Keys via Bluetooth or USB.");

        MIDIControllerIO.attachLogOutput((msg) => {
            midiEventsLogArray.unshift(msg);
            setMIDIEventsLog(midiEventsLogArray.join("\n"));
        });

        MIDIControllerIO.attachDeviceListOutput((txt) => {
            setDeviceList(txt);
        });

        LUMIKeys.attachLogOutput((msg) => {
            console.log(msg);
            lumiEventsLogArray.unshift(msg);
            setLUMIEventsLog(lumiEventsLogArray.join("\n"));
        });
    }

    export function onSelectInstrumentChange(e) {
        const instrumentType = validateInstrumentType(e.target.value);
        store.set(Constants.StoreKeys.PIANO_TYPE, instrumentType);
        setSelectedInstrument(instrumentType);
        setInstrument(instrumentType);
    }

    function setInstrument(instrumentType: InstrumentType) {
        if (soundOutput) {
            if (soundOutput.type === instrumentType) {
                console.log("You chose the same instrumentType. Nothing more to do here.");
                return;
            }
            console.log("Disposing of previous soundOutput.");
            soundOutput.dispose();
        }
        console.log("Set Instrument Type: " + instrumentType);
        soundOutput = new Instrument(instrumentType);
        ComputerKeyboardMusicInput.setSoundOutput(soundOutput);
        MIDIControllerIO.setSoundOutput(soundOutput);
    }

    export function setHandlers(handlers: any) {
        setDeviceList = handlers.setDeviceList;
        setMIDIEventsLog = handlers.setMIDIEventsLog;
        setLUMIEventsLog = handlers.setLUMIEventsLog;
        setSelectedInstrument = handlers.setSelectedInstrument;
    }
}
export default App;
