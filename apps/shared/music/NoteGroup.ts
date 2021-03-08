// A song is a multi-track series of NoteGroups (which each contain single notes).

// one or more notes
// start time
// duration

// a guitar strum is modeled as separate NoteGroups played in quick succession.
// a piano arpeggio is similar.

// the defining thing about NoteGroup is that all notes here start at the same exact time, and have the same exact duration.

type GuitarNote = {};

type PianoNote = {};

class NoteGroup {
    notes: Array<GuitarNote | PianoNote> = null;
    constructor() {}
}

export default NoteGroup;
