// A song can contain multiple tracks (e.g., multi-track MIDI files).
// A track is just a series of NoteGroups.
class Track extends Array {
    constructor() {
        super(...arguments);
        // NOTHING YET
        this.trackNumber = -1;
    }
}
// Each NoteGroup contains multiple notes to be played at the same time.
// All notes in this chord have the same start time, although we might allow each Note to have a different duration. (maybe?)
class NoteGroup {
    // durationMillis: number = -1; // TODO: if a duration is specified, all notes get the same duration. This overrides each individual note's duration.
    // NoteGroup looks like: 40.44.47 or [40.44.47 @ 1530]
    // The number after the @ indicates the playback time of the NoteGroup, in milliseconds.
    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    constructor(a, playTimeMillis = -1, trackIndex = 0) {
        this.playTimeMillis = -1;
        this.trackNumber = 0; // Which MIDI track was this NoteGroup extracted from?
        this.noteNumber = -1; // What is the index of the MIDI note?
        this.playTimeMillis = playTimeMillis;
        this.trackNumber = trackIndex;
        if (typeof a === 'string') {
            let noteGroupString = a;
            if (noteGroupString.indexOf('[') !== -1) {
                let pattern = /\[\s*(.+)\s*\@\s*(.+)\s*\]/;
                let match = pattern.exec(noteGroupString);
                noteGroupString = match[1]; // e.g., 40.44.47
                let timeString = match[2]; // e.g., 1530
                this.playTimeMillis = parseFloat(timeString); // The playTimeMillis was specified, e.g. [40.44.47 @ 1530]
            }
            let pianoKeyNotes = [];
            let pianoKeyStrings = noteGroupString.split('.');
            for (let s of pianoKeyStrings) {
                let n = parseInt(s);
                pianoKeyNotes.push(new Note(n));
            }
            this.notes = pianoKeyNotes;
        }
        else if (a) {
            this.notes = [a];
        }
        else {
            this.notes = [];
        }
    }
    addNote(n) {
        this.notes.push(n);
        let len = this.notes.length;
        if (len > 1) {
            this.notes.sort(Note.compare);
            // This "unique-ifying" algorithm only works because we sorted the array in the line above.
            let uniqueNotes = [this.notes[0]];
            for (let i = 1; i < len; i++) {
                let mostRecentlyAddedNote = uniqueNotes[uniqueNotes.length - 1];
                let note = this.notes[i];
                if (note.pianoNote !== mostRecentlyAddedNote.pianoNote) {
                    uniqueNotes.push(note);
                }
            }
            this.notes = uniqueNotes;
        }
    }
    // V2
    toString() {
        if (this.playTimeMillis === -1) {
            return this.notes.join('.'); // Use the simple format when playTimeMillis is not specified (i.e. -1).
        }
        else {
            return `[${this.notes.join('.')} @ ${this.playTimeMillis}]`; // V2 contains the playTime for each NoteGroup
        }
    }
    // Used by Song.getTracksAsJSON() in piano.v2.ts
    toJSON() {
        return this.toString();
    }
    toFullString() {
        return `${this.notes.join('.')} @ ${this.playTimeMillis} with trackIndex: ${this.trackNumber} noteGroupIndex: ${this.noteNumber}`;
    }
    // V1 of our Tiny Piano Song format does not contain the playTime.
    toStringV1() {
        return this.notes.join('.');
    }
    get numNotes() {
        return this.notes.length;
    }
    copy() {
        let clone = new NoteGroup(this.toString());
        clone.playTimeMillis = this.playTimeMillis;
        clone.trackNumber = this.trackNumber;
        clone.noteNumber = this.noteNumber;
        return clone;
    }
    static merge(n1, n2) {
        let merged = new NoteGroup();
        for (let note of n1.notes) {
            merged.addNote(note);
        }
        for (let note of n2.notes) {
            merged.addNote(note);
        }
        return merged;
    }
}
// A Note specifies a place on the piano to play. It maps to a MIDI on/off event pair.
class Note {
    static compare(a, b) {
        return a.pianoNote - b.pianoNote; // sort from smallest number to highest number
    }
    constructor(pianoNote, durationMillis = 1000, velocity = 127) {
        this.pianoNote = pianoNote;
        this.midiNote = pianoNote + 20;
        this.durationMillis = durationMillis;
        this.velocity = velocity;
    }
    toString() {
        return this.pianoNote + '';
    }
}
//# sourceMappingURL=music.js.map