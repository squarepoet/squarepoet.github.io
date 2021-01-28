import { Note, NoteGroup } from "apps/author/piano/v2/Music";

import { duration } from "@material-ui/core";

const JSmidgenMIDI = require("jsmidgen");
const MIDIFile = require("midifile");
const MIDIEvents = require("midievents");

// Currently handles 1 file at a time.
// In the future, we can load multiple files, to be indexed by the timestamp when they were loaded.

let midiFile = null;
let midiEvents = null;
let midiLyrics = null;
let midiNumTracks = 0;
let midiDurationInSeconds = 0;
let midiFileName = "";
let midiFileSize = 0;

class MIDIFileIO {
    static clearLoadedFile(): void {
        midiFile = null;
        midiEvents = null;
        midiLyrics = null;
        midiNumTracks = 0;
        midiDurationInSeconds = 0;
        midiFileName = "";
        midiFileSize = 0;
    }

    static hasLoadedAFile(): boolean {
        return midiFile !== null;
    }

    // We should label this async, hehe.
    static async readFileAsync(file) {
        midiFileName = file.name;
        midiFileSize = file.size; // in bytes
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (e: any) => {
                const arrayBuffer = e.target.result;
                MIDIFileIO.parseFileData(arrayBuffer);
                console.log("Loaded " + midiFileName);
                resolve(midiFileName);
            });
            reader.addEventListener("error", (err) => {
                console.error(err);
                reject(err);
            });
            reader.readAsArrayBuffer(file);
        });
    }

    private static parseFileData(arrayBuffer) {
        midiFile = new MIDIFile(arrayBuffer);
        midiEvents = midiFile.getMidiEvents();
        midiLyrics = midiFile.getLyrics();

        const header = midiFile.header;
        const format = header.getFormat();
        midiNumTracks = header.getTracksCount();
        console.log(`MIDI Format: ${format}`); // 0 | 1 | 2
        if (header.getTimeDivision() === MIDIFile.Header.TICKS_PER_BEAT) {
            console.log(`Ticks Per Beat: ${header.getTicksPerBeat()}`);
        } else {
            console.log("TODO: SMPTE Frames!");
        }
        if (midiLyrics.length > 0) {
            console.log(`Lyrics Track contains ${midiLyrics.length} events.`);
            // Each Lyrics Event has a .playTime and .text property.
        } else {
            midiLyrics = null;
        }

        // Calculate song duration.
        const lastMidiEvent = midiEvents[midiEvents.length - 1]; // Probably a MIDIEvents.EVENT_MIDI_NOTE_OFF event.
        const midiDurationInMillis = lastMidiEvent.playTime;
        midiDurationInSeconds = midiDurationInMillis / 1000;

        console.log(`Num Tracks: ${midiNumTracks}`);
        console.log(`Duration: ${midiDurationInSeconds}`);
    }

    static getLoadedFile() {
        return midiFile;
    }

    static getLoadedEvents() {
        return midiEvents;
    }

    static getDurationInSeconds() {
        return midiDurationInSeconds;
    }

    static getNumTracks() {
        return midiNumTracks;
    }

    static getFileName() {
        return midiFileName;
    }

    static getFileSize() {
        return midiFileSize;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Use jsmidgen to create a MIDI file that we can encode in base 64.
    // https://github.com/dingram/jsmidgen
    static createFileFromTracks(trackNumbersToInclude: number[], noteGroups: NoteGroup[]): string {
        const file = new JSmidgenMIDI.File();

        const BPM = 240; // Normally I'd choose 120, but 240 might give us better time resolution?
        const TICKS_PER_SECOND = 512; // => (128 * BPM / 60.0)  jsmidgen has a hard-coded 128 ticks per beat.
        const TICKS_PER_MILLISECOND = TICKS_PER_SECOND / 1000.0;
        const CHANNEL = 0; // For now, always use channel 0.

        const midiTracks = new Map<number, any>(); // track number => JSMIDGEN_MIDI.Track objects

        for (let trackNumber of trackNumbersToInclude) {
            const midiTrack = new JSmidgenMIDI.Track();
            midiTrack.setTempo(BPM);

            // https://www.midi.org/specifications/item/gm-level-1-sound-set
            const instrumentNumber = 1; // 1 === Grand Piano, 7 === Harpsichord, 25 == Acoustic Guitar Nylon, 74 == Flute
            // MIDI Instrument Codes are (instrumentNumber - 1) expressed in hexadecimal
            // For example: Acoustic Guitar Nylon's is # 25 (dec) so its Instrument Code is 24 (dec) === 0x18 (hex)
            midiTrack.setInstrument(CHANNEL, instrumentNumber - 1);

            midiTracks[trackNumber] = midiTrack;
            file.addTrack(midiTrack);
        }

        // Whenever we add a noteOn event, we will need to turn it off!
        // We do this because (currently) NoteGroups don't have a filled-in duration field.
        // So the only way we calculate duration is by waiting until we see a new NoteGroup
        // in the same track before we turn off the previous NoteGroup.
        const noteGroupsToTurnOff = new Map<number, NoteGroup>(); // track number => NoteGroup

        for (const currNoteGroup of noteGroups) {
            const trackNumber = currNoteGroup.trackNumber;
            const midiTrack = midiTracks[trackNumber];
            if (!midiTrack) {
                console.log("OOPS: MIDI TRACK IS NULL"); // should never happen!
                continue;
            }

            // duration of a note:
            //   * next note's playTimeMillis minus current note's playTimeMillis
            //   * if this is the last note, we set the duration to 1.0 seconds

            const previousNoteGroup: NoteGroup = noteGroupsToTurnOff[trackNumber];
            if (previousNoteGroup) {
                noteGroupsToTurnOff[trackNumber] = null;

                const durationOfPreviousNoteMillis = currNoteGroup.playTimeMillis - previousNoteGroup.playTimeMillis;
                const durationOfPreviousNoteTicks = durationOfPreviousNoteMillis * TICKS_PER_MILLISECOND;

                previousNoteGroup.notes.forEach((previousNote, index) => {
                    // for the first note, deltaTimeTicks === the note's duration.
                    // for all other notes, deltaTimeTicks is 0, since they all turn OFF at the same time.
                    const deltaTimeTicks = index === 0 ? durationOfPreviousNoteTicks : 0;
                    midiTrack.noteOff(CHANNEL, previousNote.midiNote, deltaTimeTicks);
                });
            }

            currNoteGroup.notes.forEach((note, index) => {
                // TODO: someday, we'll actually calculate the correct deltaTimeTicks.
                // Right now, we play all notes immediately after the noteOff of the previous note.
                midiTrack.noteOn(CHANNEL, note.midiNote, 0 /*deltaTimeTicks*/, note.velocity);
            });
            noteGroupsToTurnOff[trackNumber] = currNoteGroup;
        }

        // There might be a bunch of notes we need to turn off.
        for (const trackNumber in noteGroupsToTurnOff) {
            const midiTrack = midiTracks[trackNumber];
            const noteGroupToTurnOff: NoteGroup = noteGroupsToTurnOff[trackNumber];
            noteGroupToTurnOff.notes.forEach((note, index) => {
                const deltaTimeTicks = index === 0 ? TICKS_PER_SECOND : 0; // This note group will be turned off 1 second after it starts.
                midiTrack.noteOff(CHANNEL, note.midiNote, deltaTimeTicks);
            });
        }

        return file.toBytes();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    getTypeString(type) {
        switch (type) {
            case MIDIEvents.EVENT_MIDI:
                return "MIDI";
            case MIDIEvents.EVENT_META:
                return "META";
            case MIDIEvents.EVENT_SYSEX:
                return "SYSEX";
            case MIDIEvents.EVENT_DIVSYSEX:
                return "DIVSYSEX";
            default:
                return "UNKNOWN";
        }
    }

    getSubTypeString(subtype) {
        switch (subtype) {
            case MIDIEvents.EVENT_META_SEQUENCE_NUMBER: // = 0x00;
                return "META_SEQUENCE_NUMBER";
            case MIDIEvents.EVENT_META_TEXT: // = 0x01;
                return "META_TEXT";
            case MIDIEvents.EVENT_META_COPYRIGHT_NOTICE: // = 0x02;
                return "META_COPYRIGHT_NOTICE";
            case MIDIEvents.EVENT_META_TRACK_NAME: // = 0x03;
                return "META_TRACK_NAME";
            case MIDIEvents.EVENT_META_INSTRUMENT_NAME: // = 0x04;
                return "META_INSTRUMENT_NAME";
            case MIDIEvents.EVENT_META_LYRICS: // = 0x05;
                return "META_LYRICS";
            case MIDIEvents.EVENT_META_MARKER: // = 0x06;
                return "META_MARKER";
            case MIDIEvents.EVENT_META_CUE_POINT: // = 0x07;
                return "CUE_POINT";
            case MIDIEvents.EVENT_META_MIDI_CHANNEL_PREFIX: // = 0x20;
                return "META_MIDI_CHANNEL_PREFIX";
            case MIDIEvents.EVENT_META_END_OF_TRACK: // = 0x2F;
                return "META_END_OF_TRACK";
            case MIDIEvents.EVENT_META_SET_TEMPO: //= 0x51;
                return "META_SET_TEMPO";
            case MIDIEvents.EVENT_META_SMTPE_OFFSET: //= 0x54;
                return "META_SMTPE_OFFSET";
            case MIDIEvents.EVENT_META_TIME_SIGNATURE: //= 0x58;
                return "META_TIME_SIGNATURE";
            case MIDIEvents.EVENT_META_KEY_SIGNATURE: //= 0x59;
                return "META_KEY_SIGNATURE";
            case MIDIEvents.EVENT_META_SEQUENCER_SPECIFIC: //= 0x7F;
                return "META_SEQUENCER_SPECIFIC";
            case MIDIEvents.EVENT_MIDI_NOTE_OFF: // = 0x8;
                return "MIDI_NOTE_OFF";
            case MIDIEvents.EVENT_MIDI_NOTE_ON: //= 0x9;
                return "MIDI_NOTE_ON";
            case MIDIEvents.EVENT_MIDI_NOTE_AFTERTOUCH: // = 0xA;
                return "MIDI_NOTE_AFTERTOUCH";
            case MIDIEvents.EVENT_MIDI_CONTROLLER: //= 0xB;
                return "MIDI_CONTROLLER";
            case MIDIEvents.EVENT_MIDI_PROGRAM_CHANGE: // = 0xC;
                return "MIDI_PROGRAM_CHANGE";
            case MIDIEvents.EVENT_MIDI_CHANNEL_AFTERTOUCH: // = 0xD;
                return "MIDI_CHANNEL_AFTERTOUCH";
            case MIDIEvents.EVENT_MIDI_PITCH_BEND: // = 0xE;
                return "MIDI_PITCH_BEND";
            default:
                return "UNKNOWN";
        }
    }
    */
}

export default MIDIFileIO;
