// A song can contain multiple tracks (e.g., multi-track MIDI files).

// A track is just a series of NoteGroups.
class Track extends Array<NoteGroup> {
    // NOTHING YET
    trackNumber: number = -1;
}

// Each NoteGroup contains multiple notes to be played at the same time.
// All notes in this chord have the same start time, although we might allow each Note to have a different duration. (maybe?)
class NoteGroup {
    notes: Array<Note>;
    playTimeMillis: number = -1;
    trackNumber: number = 0; // Which MIDI track was this NoteGroup extracted from?
    noteNumber: number = -1; // What is the index of the MIDI note?
    // durationMillis: number = -1; // TODO: if a duration is specified, all notes get the same duration. This overrides each individual note's duration.

    // NoteGroup looks like: 40.44.47 or [40.44.47 @ 1530]
    // The number after the @ indicates the playback time of the NoteGroup, in milliseconds.

    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    constructor(a?: Note | string, playTimeMillis: number = -1, trackIndex: number = 0) {
        this.playTimeMillis = playTimeMillis;
        this.trackNumber = trackIndex;
        if (typeof a === "string") {
            // e.g., "40.44.47" => C,E,G
            let noteGroupString = a;
            if (noteGroupString.indexOf("[") !== -1) {
                let pattern = /\[\s*(.+)\s*\@\s*(.+)\s*\]/;
                let match = pattern.exec(noteGroupString);
                noteGroupString = match[1]; // e.g., 40.44.47
                let timeString = match[2]; // e.g., 1530
                this.playTimeMillis = parseFloat(timeString); // The playTimeMillis was specified, e.g. [40.44.47 @ 1530]
            }

            let pianoKeyNotes = [];
            let pianoKeyStrings = noteGroupString.split(".");
            for (let s of pianoKeyStrings) {
                let n = parseInt(s);
                pianoKeyNotes.push(new Note(n));
            }
            this.notes = pianoKeyNotes;
        } else if (a) {
            // a single Note object
            this.notes = [a];
        } else {
            this.notes = [];
        }
    }

    addNote(n: Note) {
        this.notes.push(n);
        let len = this.notes.length;
        if (len > 1) {
            // If the notes array contains more than one item, we need to sort and unique the notes.
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
    toString(): string {
        if (this.playTimeMillis === -1) {
            return this.notes.join("."); // Use the simple format when playTimeMillis is not specified (i.e. -1).
        } else {
            return `[${this.notes.join(".")} @ ${this.playTimeMillis}]`; // V2 contains the playTime for each NoteGroup
        }
    }

    // Used by Song.getTracksAsJSON() in piano.v2.ts
    toJSON(): string {
        return this.toString();
    }

    toFullString(): string {
        return `${this.notes.join(".")} @ ${this.playTimeMillis} with trackIndex: ${this.trackNumber} noteGroupIndex: ${this.noteNumber}`;
    }

    // V1 of our Tiny Piano Song format does not contain the playTime.
    toStringV1(): string {
        return this.notes.join(".");
    }

    get numNotes(): number {
        return this.notes.length;
    }

    copy(): NoteGroup {
        let clone = new NoteGroup(this.toString());
        clone.playTimeMillis = this.playTimeMillis;
        clone.trackNumber = this.trackNumber;
        clone.noteNumber = this.noteNumber;
        return clone;
    }

    static merge(n1: NoteGroup, n2: NoteGroup): NoteGroup {
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
    public static compare(a: Note, b: Note): number {
        return a.pianoNote - b.pianoNote; // sort from smallest number to highest number
    }

    public pianoNote: number;
    public midiNote: number;
    public durationMillis: number;
    public velocity: number;

    constructor(pianoNote, durationMillis = 1000, velocity = 127) {
        this.pianoNote = pianoNote;
        this.midiNote = pianoNote + 20;
        this.durationMillis = durationMillis;
        this.velocity = velocity;
    }

    public toString(): string {
        return this.pianoNote + "";
    }
}

export { Track, NoteGroup, Note };
