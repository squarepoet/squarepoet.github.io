class Track extends Array {
    constructor() {
        super(...arguments);
        this.trackNumber = -1;
    }
}
class NoteGroup {
    constructor(a, playTimeMillis = -1, trackIndex = 0) {
        this.playTimeMillis = -1;
        this.trackNumber = 0;
        this.noteNumber = -1;
        this.playTimeMillis = playTimeMillis;
        this.trackNumber = trackIndex;
        if (typeof a === 'string') {
            let noteGroupString = a;
            if (noteGroupString.indexOf('[') !== -1) {
                let pattern = /\[\s*(.+)\s*\@\s*(.+)\s*\]/;
                let match = pattern.exec(noteGroupString);
                noteGroupString = match[1];
                let timeString = match[2];
                this.playTimeMillis = parseFloat(timeString);
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
    toString() {
        if (this.playTimeMillis === -1) {
            return this.notes.join('.');
        }
        else {
            return `[${this.notes.join('.')} @ ${this.playTimeMillis}]`;
        }
    }
    toJSON() {
        return this.toString();
    }
    toFullString() {
        return `${this.notes.join('.')} @ ${this.playTimeMillis} with trackIndex: ${this.trackNumber} noteGroupIndex: ${this.noteNumber}`;
    }
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
class Note {
    static compare(a, b) {
        return a.pianoNote - b.pianoNote;
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