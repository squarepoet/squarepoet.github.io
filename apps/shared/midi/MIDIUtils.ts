namespace MIDIUtils {
    // Converts a piano note (C4 == 40) to MIDI (C4 == 60)
    export function p2m(pianoNote) {
        return pianoNote + 20;
    }

    // Converts a MIDI note (C4 == 60) to a piano note (C4 == 40) to
    export function m2p(midiNote) {
        return midiNote - 20;
    }
}

export default MIDIUtils;
