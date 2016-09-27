'use strict';

/////////////////////////////////////////////////////////////////////////////////
// declare types that are defined in 3rd party libraries
declare let $: any;
declare let _: any;
declare let DragDrop: any;
declare let Instrument: any;
/////////////////////////////////////////////////////////////////////////////////

const TIME_BETWEEN_NOTEGROUPS = 250;
const TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES = 0; // Adjust this for parsing MIDI recordings of piano performances (i.e., imprecise timing).

const WORKER_URL = '/s/js/author/piano.v2.worker.js';

// Support multi track MIDI songs.
// When we compose by hand, stick everything in track 0.
let $tracks = []; // jQuery references to the elements. Allows us to modify the DOM.
let $trackInfos = []; // jQuery references to the elements. Allows us to modify the DOM.
let $currentStatus = null;

let $sharps, $flats;
let sharps = ""; // the string value of the $sharps input
let flats = "";
let octaveOffset = 0;

// jQuery references to the DOM
let $download_midi_link = null;
let $download_text_link = null;
let $playButton = null;
let $pauseButton = null;
let $stopButton = null;

// piano key numbers % 12
let blackKeys = [2, -1, 5, 7, -1, 10, 0]; // -1 is for the spaces where there are no black keys
let whiteKeys = [1, 3, 4, 6, 8, 9, 11];
let noteLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

let sharpOrFlatModifier = 0;

let pianoInstrument = new Instrument('piano'); // musical.js

// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
function p2m(pianoNote) {
    return pianoNote + 20;
}

function m2p(midiNote) {
    return midiNote - 20;
}

namespace Keyboard {
    // which character to type to get the corresponding white key
    export const labels = [
        '␣', 'z', 'x', // G A B
        'c', 'v', 'b', 'n', 'm', ',', '.', // C D E F G A B
        '/', 'a', 's', 'd', 'f', 'g', 'h', // C D E F G A B
        'j', 'k', 'l', ';', 'q', 'w', 'e', // C D E F G A B
        'r', 't', 'y', 'u', 'i', 'o', 'p', // C D E F G A B
        '[', ']', '\\', '1', '2', '3', '4', // C D E F G A B
        '5', '6', '7', '8', '9', '0', '-', // C D E F G A B
        '=' // C
    ];

    export const keyCodeToPianoKeyNumber = {
        32: 11, // SPACE => G1
        90: 13, // z => A
        88: 15, // x => B
        //
        67: 16, // c => C2
        86: 18, // v => D
        66: 20, // b => E
        78: 21, // n => F
        77: 23, // m => G
        188: 25, // , => A
        190: 27, // . => B
        //
        191: 28, // / => C3
        65: 30, // a => D
        83: 32, // s => E
        68: 33, // d => F
        70: 35, // f => G
        71: 37, // g => A
        72: 39, // h => B
        //
        74: 40, // j => C4 (Middle C)
        75: 42, // k => D
        76: 44, // l => E
        186: 45, // ; => F in Chrome
        59: 45, // ; => F in Firefox
        222: 47, // ' => G
        81: 47, // q => G
        87: 49, // w => A
        69: 51, // e => B
        //
        82: 52, // r => C5
        84: 54, // t => D
        89: 56, // y => E
        85: 57, // u => F
        73: 59, // i => G
        79: 61, // o => A
        80: 63, // p => B
        //
        219: 64, // [ => C6
        221: 66, // ] => D
        220: 68, // \ => E
        192: 68, // ` => E
        49: 69, // 1 => F
        50: 71, // 2 => G
        51: 73, // 3 => A
        52: 75, // 4 => B
        //
        53: 76, // 5 => C7
        54: 78, // 6 => D
        55: 80, // 7 => E
        56: 81, // 8 => F
        57: 83, // 9 => G
        48: 85, // 0 => A
        189: 87, // - => B
        //
        187: 88 // = => C8
    };

}

//////////////////////////////////////////////////////////////////////

// resets the key offset
function resetOffset() {
    console.log("Reset Offsets");
    octaveOffset = 0;
    UI.drawPiano();
}

function resetEverything() {
    console.log("Reset Everything!");
    octaveOffset = 0;
    setupTracks(1);
    UI.checkAllNonEmptyTracks();
    saveAndShowData();
    Playback.stop();
    $('#file-info').html('&nbsp;');
    $('#song-info').html('&nbsp;');
}

function addTracks(numTracks) {
    let html = '';
    for (let t = 0; t < numTracks; t++) {
        Song.addTrack(t);
        let checkbox = `<input id="track-${t}-checkbox" type="checkbox" class="checkbox">`;
        let info = `<div id="track-${t}-info" class="track-info"></div>`;
        let track = `<div id="track-${t}" class="track">`;
        html += `<div id="track-${t}-container" class="track-container">${checkbox}${info}${track}</div></div>`; // Also add the corresponding DOM elements.
    }
    $('#tracks').html(html);

    for (let t = 0; t < numTracks; t++) {
        let $checkbox = $(`#track-${t}-checkbox`);
        $checkbox.change(function () {
            UI.setCheckedState(t, this.checked);
            LocalStorage.saveCheckBoxes();
            Song.invalidateCache();
        });
        $tracks.push($(`#track-${t}`));
        $trackInfos.push($(`#track-${t}-info`));
    }
}

function saveAndShowData() {
    LocalStorage.saveCheckBoxes();
    LocalStorage.saveTracks();
    UI.showNoteGroupsForTracks();
    UI.drawPiano();
}

function getNoteGroupID(trackNumber, noteGroupNumber) {
    return `t${trackNumber}_n${noteGroupNumber}`;
}

function scrollNoteGroupIntoView(trackNumber: number, noteGroupNumber: number) {
    let noteGroupID = getNoteGroupID(trackNumber, noteGroupNumber);
    // Scroll the divs all the way to the right to make sure the most recent NoteGroups are visible.
    let element = <HTMLElement>document.querySelector(`#${noteGroupID}`);
    if (element) {
        element.scrollIntoView();
    }
}

////////////////////////////////////////////////////////////

namespace LocalStorage {

    export function load() {
        loadTracks();
        loadSharpsAndFlats();
        loadCheckboxes();
    }

    function loadSharpsAndFlats() {
        if (!localStorage.getItem('sharps')) {
            localStorage.setItem('sharps', '');
        }
        sharps = localStorage.getItem('sharps');
        $sharps.val(sharps);

        if (!localStorage.getItem('flats')) {
            localStorage.setItem('flats', '');
        }
        flats = localStorage.getItem('flats');
        $flats.val(flats);
    }

    function loadTracks() {
        try {
            let savedTracks = JSON.parse(localStorage.getItem('tracks')); // can throw a SyntaxError
            let numTracks = savedTracks.length;

            setupTracks(numTracks);
            for (let t = 0; t < numTracks; t++) {
                let savedTrack = savedTracks[t];
                for (let noteGroupString of savedTrack) {
                    let noteGroup = new NoteGroup(noteGroupString);
                    Song.addNoteGroupToTrack(noteGroup, t);
                }
            }
        } catch (e) {
            setupTracks(1);
        }
    }

    function loadCheckboxes() {
        try {
            let savedCheckboxState = JSON.parse(localStorage.getItem('checkboxes')); // can throw a SyntaxError
            if (Array.isArray(savedCheckboxState) &&
                (savedCheckboxState.length === Song.getNumTracks())) {
                UI.setCheckedStateArray(savedCheckboxState);
            } else {
                throw 'OOPS';
            }
        } catch (e) {
            UI.checkAllNonEmptyTracks();
            saveCheckBoxes();
        }
    }

    export function saveCheckBoxes() {
        localStorage.setItem('checkboxes', JSON.stringify(UI.getCheckedStateArray()));
    }

    export function saveTracks() {
        let tracksJSON = Song.getTracksAsJSON();
        localStorage.setItem('tracks', tracksJSON);
    }

    export function saveSharpsAndFlats() {
        localStorage.setItem('sharps', sharps);
        localStorage.setItem('flats', flats);
    }
}

function playOneNote(pianoKeyBeforeModifiers) {
    // get the name of the note we are about to play
    let remainder = pianoKeyBeforeModifiers % 12;
    let whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
    let noteLabel = noteLabels[whiteKeyNoteIndex];

    let modifier = sharpOrFlatModifier;

    // is this note auto-sharped, due to the key signature?
    if (sharps.indexOf(noteLabel) != -1) {
        modifier++; // raise the sharp a half-step!
    }
    // is this note auto-flatted, due to the key signature?
    if (flats.indexOf(noteLabel) != -1) {
        modifier--; // lower the note a half-step!
    }

    let pianoKeyNumber = pianoKeyBeforeModifiers + modifier + (octaveOffset * 12);
    if (pianoKeyNumber < 1 || pianoKeyNumber > 88) {
        return;
    }

    let t = Highlight.activeTrack();
    let trackLength = Song.addNoteGroupToTrack(new NoteGroup(new Note(pianoKeyNumber)), t);
    UI.setCheckedState(t, true);

    playMIDINote(p2m(pianoKeyNumber));

    Highlight.setTrackAndNoteGroup(t, trackLength - 1);
    saveAndShowData();
}

function setupTracks(numTracks: number) {
    Song.reset();
    $tracks = [];
    $trackInfos = [];
    addTracks(numTracks);
    Highlight.setupIndexes();
}

function displayFileInfo(file) {
    $('#file-info').text(`Loaded File: ${file.name} | Size: ${file.size} bytes`);
}

function setupFileChooser() {
    let $fileChooser = $('#filechooser');
    $fileChooser.change((e) => {
        let files = e.target.files;
        if (files.length > 0) {
            MIDI.readFile(files[0]); // Get the first file.
        }
    });

    $('#filechooserlabel').mousedown((e) => {
        $fileChooser[0].value = null;
    });
}

function displaySongInfo(params) {
    let duration = Math.round(params.duration * 100) / 100;
    $('#song-info').text(`Num Tracks: ${params.numTracks} | Duration: ${duration} secs`);
}

function playMIDINote(midiNoteNum, velocity = 127.0) {
    pianoInstrument.tone({
        pitch: -midiNoteNum, // This API expects negative numbers to indicate MIDI notes. Positive numbers indicate audio tone frequency (Hz).
        duration: 1.0, // 0.125, 0.25, 0.5, 1.0, 2.0
        velocity: (velocity / 127.0)
    });
}

/////////////////////////////////////////////////////////////////////////////////

// Allow us to highlight a current track or current note group.
namespace Highlight {
    const h = 'highlight';

    let currTrackNumber: number = 0;
    let currNoteGroupNumberForTrackNumber: number[] = [];

    let $currTrack = null;
    let $currTrackInfo = null;
    let $currNoteGroup = null;

    export function setupIndexes() {
        currTrackNumber = 0;
        currNoteGroupNumberForTrackNumber = [];
        let numTracks = Song.getNumTracks();
        for (let t = 0; t < numTracks; t++) {
            currNoteGroupNumberForTrackNumber.push(0);
        }
    }

    export function activeTrack(): number {
        return currTrackNumber;
    }

    export function activeNoteGroup(): number {
        return currNoteGroupNumberForTrackNumber[currTrackNumber];
    }

    // Updates the visual indicators for our current track and current notegroup.
    export function update() {
        let numTracks = $tracks.length;
        // assume the currentTrack & currentNoteGroup numbers are valid.
        // unhighlight the currently highlighted tracks.
        if ($currTrack) {
            $currTrack.removeClass(h);
        }
        if ($currTrackInfo) {
            $currTrackInfo.removeClass(h);
        }
        if ($currNoteGroup) {
            $currNoteGroup.removeClass(h);
        }
        $currTrack = $tracks[currTrackNumber].addClass(h);
        $currTrackInfo = $trackInfos[currTrackNumber].addClass(h);
        $currNoteGroup = $('#' + getNoteGroupID(currTrackNumber, activeNoteGroup())).addClass(h);

        UI.drawPiano();
    }

    function validateTrackNumber() {
        let numTracks = Song.getNumTracks();
        if (currTrackNumber < 0) {
            currTrackNumber = 0;
        } else if (currTrackNumber >= numTracks) {
            currTrackNumber = numTracks - 1;
        }
    }

    function validateNoteGroupNumber() {
        // Assume the current track number is valid.
        let numNoteGroups = Song.getNumNoteGroupsInTrack(currTrackNumber);
        let noteGroupNumber = activeNoteGroup();
        if (noteGroupNumber < 0) {
            setCurrentNoteGroupNumber(0);
        } else if (noteGroupNumber >= numNoteGroups) {
            setCurrentNoteGroupNumber(numNoteGroups - 1);
        }
    }

    export function setTrackAndNoteGroup(t: number, n: number) {
        currTrackNumber = t;
        setCurrentNoteGroupNumber(n);
        validateTrackNumber();
        validateUpdateScroll();
    }

    export function prevTrack() {
        currTrackNumber--;
        validateTrackNumber();
        update();
    }

    export function nextTrack() {
        currTrackNumber++;
        validateTrackNumber();
        update();
    }

    function setCurrentNoteGroupNumber(i) {
        currNoteGroupNumberForTrackNumber[currTrackNumber] = i;
    }

    export function prevNoteGroup() {
        currNoteGroupNumberForTrackNumber[currTrackNumber]--;
        validateUpdateScroll();
    }

    export function nextNoteGroup() {
        currNoteGroupNumberForTrackNumber[currTrackNumber]++;
        validateUpdateScroll();
    }

    export function firstNoteGroup() {
        setCurrentNoteGroupNumber(0);
        validateUpdateScroll();
    }

    export function lastNoteGroup() {
        let numNoteGroups = Song.getNumNoteGroupsInTrack(currTrackNumber);
        setCurrentNoteGroupNumber(numNoteGroups - 1);
        validateUpdateScroll();
    }

    function validateUpdateScroll() {
        validateNoteGroupNumber();
        update();
        scrollNoteGroupIntoView(currTrackNumber, activeNoteGroup());
    }
}

/////////////////////////////////////////////////////////////////////////////////

// Wrap all our various MIDI APIs into a single namespace.
namespace MIDI {

    // Third Party Libraries
    declare let Midi: any; // jsmidgen
    declare let MIDIEvents: any;
    declare let MIDIFile: any;

    let midiFile = null;
    let midiEvents = null;

    export function hasLoadedAFile(): boolean {
        return midiFile !== null;
    }

    // Use jsmidgen to create a MIDI file that we can encode in base 64.
    // https://github.com/dingram/jsmidgen
    export function getFileFromTracks(): string {
        let file = new Midi.File();

        const BPM = 240; // Normally I'd choose 120, but 240 might give us better time resolution?
        const TICKS_PER_SECOND = 512; // => (128 * BPM / 60.0)  jsmidgen has a hard-coded 128 ticks per beat.
        const TICKS_PER_MILLISECOND = TICKS_PER_SECOND / 1000.0;
        const CHANNEL = 0; // For now, always use channel 0.

        let midiTracks = new Map<number, any>(); // track number => Midi.Track objects

        let numTracks = Song.getNumTracks();
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            if (UI.isChecked(trackNumber)) {
                let midiTrack = new Midi.Track();
                midiTrack.setTempo(BPM);

                // https://www.midi.org/specifications/item/gm-level-1-sound-set
                let instrumentNumber = 1; // 1 === Grand Piano, 7 === Harpsichord, 25 == Acoustic Guitar Nylon, 74 == Flute
                // MIDI Instrument Codes are (instrumentNumber - 1) expressed in hexadecimal
                // For example: Acoustic Guitar Nylon's is # 25 (dec) so its Instrument Code is 24 (dec) === 0x18 (hex)
                midiTrack.setInstrument(CHANNEL, instrumentNumber - 1);

                midiTracks[trackNumber] = midiTrack;
                file.addTrack(midiTrack);
            }
        }

        // Whenever we add a noteOn event, we will need to turn it off!
        // We do this because (currently) NoteGroups don't have a filled-in duration field.
        // So the only way we calculate duration is by waiting until we see a new NoteGroup
        // in the same track before we turn off the previous NoteGroup.
        let noteGroupsToTurnOff = new Map<number, NoteGroup>(); // track number => NoteGroup

        let noteGroups = Song.getNoteGroupsFromTracks();
        for (let currNoteGroup of noteGroups) {
            let trackNumber = currNoteGroup.trackNumber;
            let midiTrack = midiTracks[trackNumber];
            if (!midiTrack) {
                console.log('OOPS: MIDI TRACK IS NULL'); // should never happen!
                continue;
            }

            // duration of a note:
            //   * next note's playTimeMillis minus current note's playTimeMillis
            //   * if this is the last note, we set the duration to 1.0 seconds

            let previousNoteGroup: NoteGroup = noteGroupsToTurnOff[trackNumber];
            if (previousNoteGroup) {
                noteGroupsToTurnOff[trackNumber] = null;

                let durationOfPreviousNoteMillis = currNoteGroup.playTimeMillis - previousNoteGroup.playTimeMillis;
                let durationOfPreviousNoteTicks = durationOfPreviousNoteMillis * TICKS_PER_MILLISECOND;

                previousNoteGroup.notes.forEach((previousNote, index) => {
                    // for the first note, deltaTimeTicks === the note's duration.
                    // for all other notes, deltaTimeTicks is 0, since they all turn OFF at the same time.
                    let deltaTimeTicks = (index === 0) ? durationOfPreviousNoteTicks : 0;
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
        for (let trackNumber in noteGroupsToTurnOff) {
            let midiTrack = midiTracks[trackNumber];
            let noteGroupToTurnOff: NoteGroup = noteGroupsToTurnOff[trackNumber];
            noteGroupToTurnOff.notes.forEach((note, index) => {
                let deltaTimeTicks = (index === 0) ? TICKS_PER_SECOND : 0; // This note group will be turned off 1 second after it starts.
                midiTrack.noteOff(CHANNEL, note.midiNote, deltaTimeTicks);
            });
        }

        return file.toBytes();
    }

    function parseData(arrayBuffer) {
        console.log('parseData');
        Playback.stop();

        midiFile = new MIDIFile(arrayBuffer);
        let header = midiFile.header;
        let format = header.getFormat();
        let numTracks = header.getTracksCount();
        console.log(`MIDI Format: ${format}`); // 0, 1 or 2
        if (header.getTimeDivision() === MIDIFile.Header.TICKS_PER_BEAT) {
            console.log(`Ticks Per Beat: ${header.getTicksPerBeat()}`);
        } else {
            console.log('TODO: SMPTE Frames!');
        }

        fillTracksWithNoteGroups();

        let lyrics = midiFile.getLyrics();
        if (lyrics.length > 0) {
            console.log(`Lyrics Track ${lyrics.length} events.`);
            // Each Lyrics Event has a .playTime and .text property.
        }

        // Calculate song duration.
        let lastMidiEvent = midiEvents[midiEvents.length - 1]; // Probably a MIDIEvents.EVENT_MIDI_NOTE_OFF event.
        let songDurationInMillis = lastMidiEvent.playTime;
        let songDurationInSeconds = songDurationInMillis / 1000;

        displaySongInfo({
            numTracks: numTracks,
            duration: songDurationInSeconds
        });
    }

    export function readFile(file) {
        let reader = new FileReader();
        reader.addEventListener('load', (e: any) => {
            let arrayBuffer = e.target.result;
            displayFileInfo(file);
            parseData(arrayBuffer);
        });
        reader.addEventListener('error', (err) => {
            console.error('FileReader error' + err)
        });
        reader.readAsArrayBuffer(file);
    }

    function fillTracksWithNoteGroups() {
        setupTracks(midiFile.tracks.length);

        // Convert from MIDI events to NoteGroups
        midiEvents = midiFile.getMidiEvents();

        // Remember the most recently processed event so that we can merge notes that are played at the same time and on the same track.
        let lastNoteGroup: NoteGroup = null;
        let lastPlayTime = -1;
        let lastTrackNumber = -1;

        for (let event of midiEvents) {
            let type = event.type;
            let subtype = event.subtype;
            // let status = (event.subtype << 4) + event.channel;
            // let statusCodeHexString = '0x' + status.toString(16).toUpperCase();
            let trackNumber = event.track;
            let playTime = event.playTime; // time in milliseconds
            playTime = Math.round(playTime * 1000) / 1000; // round it to the nearest 0.001
            let midiNoteNum = event.param1;
            let velocity = event.param2;
            let pianoNoteNum = m2p(midiNoteNum);
            let noteToPlay = new Note(pianoNoteNum, 1.0 /* duration */, velocity); // TODO: Support duration someday?

            if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                if ((playTime <= lastPlayTime + TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES) &&
                    trackNumber === lastTrackNumber) {
                    // Merge all notes starting at the same time and on the same track into a single NoteGroup.
                    lastNoteGroup.addNote(noteToPlay);
                } else {
                    let noteGroup = new NoteGroup(noteToPlay, playTime, trackNumber);
                    Song.addNoteGroupToTrack(noteGroup, trackNumber);
                    lastNoteGroup = noteGroup;
                    lastTrackNumber = trackNumber;
                    lastPlayTime = playTime;
                }
            }
        }

        UI.checkAllNonEmptyTracks();
        saveAndShowData();
    }

    function getTypeString(type) {
        switch (type) {
            case MIDIEvents.EVENT_MIDI:
                return 'MIDI';
            case MIDIEvents.EVENT_META:
                return 'META';
            case MIDIEvents.EVENT_SYSEX:
                return 'SYSEX';
            case MIDIEvents.EVENT_DIVSYSEX:
                return 'DIVSYSEX';
            default:
                return 'UNKNOWN';
        }
    }

    function getSubTypeString(subtype) {
        switch (subtype) {
            case MIDIEvents.EVENT_META_SEQUENCE_NUMBER: // = 0x00;
                return 'META_SEQUENCE_NUMBER';
            case MIDIEvents.EVENT_META_TEXT: // = 0x01;
                return 'META_TEXT';
            case MIDIEvents.EVENT_META_COPYRIGHT_NOTICE: // = 0x02;
                return 'META_COPYRIGHT_NOTICE';
            case MIDIEvents.EVENT_META_TRACK_NAME: // = 0x03;
                return 'META_TRACK_NAME';
            case MIDIEvents.EVENT_META_INSTRUMENT_NAME: // = 0x04;
                return 'META_INSTRUMENT_NAME';
            case MIDIEvents.EVENT_META_LYRICS: // = 0x05;
                return 'META_LYRICS';
            case MIDIEvents.EVENT_META_MARKER: // = 0x06;
                return 'META_MARKER';
            case MIDIEvents.EVENT_META_CUE_POINT: // = 0x07;
                return 'CUE_POINT';
            case MIDIEvents.EVENT_META_MIDI_CHANNEL_PREFIX: // = 0x20;
                return 'META_MIDI_CHANNEL_PREFIX';
            case MIDIEvents.EVENT_META_END_OF_TRACK: // = 0x2F;
                return 'META_END_OF_TRACK';
            case MIDIEvents.EVENT_META_SET_TEMPO: //= 0x51;
                return 'META_SET_TEMPO';
            case MIDIEvents.EVENT_META_SMTPE_OFFSET: //= 0x54;
                return 'META_SMTPE_OFFSET';
            case MIDIEvents.EVENT_META_TIME_SIGNATURE: //= 0x58;
                return 'META_TIME_SIGNATURE';
            case MIDIEvents.EVENT_META_KEY_SIGNATURE: //= 0x59;
                return 'META_KEY_SIGNATURE';
            case MIDIEvents.EVENT_META_SEQUENCER_SPECIFIC: //= 0x7F;
                return 'META_SEQUENCER_SPECIFIC';
            case MIDIEvents.EVENT_MIDI_NOTE_OFF: // = 0x8;
                return 'MIDI_NOTE_OFF';
            case MIDIEvents.EVENT_MIDI_NOTE_ON: //= 0x9;
                return 'MIDI_NOTE_ON';
            case MIDIEvents.EVENT_MIDI_NOTE_AFTERTOUCH: // = 0xA;
                return 'MIDI_NOTE_AFTERTOUCH';
            case MIDIEvents.EVENT_MIDI_CONTROLLER: //= 0xB;
                return 'MIDI_CONTROLLER';
            case MIDIEvents.EVENT_MIDI_PROGRAM_CHANGE: // = 0xC;
                return 'MIDI_PROGRAM_CHANGE';
            case MIDIEvents.EVENT_MIDI_CHANNEL_AFTERTOUCH: // = 0xD;
                return 'MIDI_CHANNEL_AFTERTOUCH';
            case MIDIEvents.EVENT_MIDI_PITCH_BEND: // = 0xE;
                return 'MIDI_PITCH_BEND';
            default:
                return 'UNKNOWN';
        }
    }
}



///////////////////////////////////////////////////////////////////////////

namespace Playback {

    // All times are in milliseconds.
    let currSongTime = 0; // What time is our playhead pointing to?
    let baseSongTime = 0; // What time did our playhead point to when we started or resumed the song?
    let clockStartTime = 0;

    let clock = new Worker(WORKER_URL);
    let clockIsTicking = false;

    clock.onmessage = function (e) {
        playNextEvents(performance.now());
    };

    // let noteGroupsToPlay: NoteGroup[] = [];
    let nextNoteGroupIndexToPlay: number = 0;

    let isPaused = false;

    let nextEventPlayTime = 0;

    export function isPlaying() {
        return clockIsTicking;
    }

    // starts or resumes playback
    export function play() {
        if (isPaused) {
            baseSongTime = currSongTime;
        } else {
            if (isPlaying()) {
                stop();
            }

            // Start the MIDI playback.
            let noteGroupsToPlay = Song.getNoteGroupsFromTracks();

            if (noteGroupsToPlay.length === 0) {
                Playback.stop();
                return; // DONE!
            }

            nextNoteGroupIndexToPlay = 0;
            currSongTime = 0;
            baseSongTime = 0;
            determinePlayTimeForNextEvent();
        }
        isPaused = false;
        clockStartTime = performance.now();
        clock.postMessage('start');
        clockIsTicking = true;
    }

    export function pause() {
        stopTheClock();
        isPaused = true; // Next time, continue from where we left off.
    }

    export function togglePlayPause() {
        if (isPlaying()) {
            pause();
        } else {
            play();
        }
    }

    export function stop() {
        stopTheClock();
        nextNoteGroupIndexToPlay = 0;
    }

    function stopTheClock() {
        if (isPlaying()) {
            clock.postMessage('stop');
            clockIsTicking = false;
        }
    }

    // Will be called every ~16.67ms if your display runs at 60 FPS.
    function playNextEvents(currTime) {
        let noteGroupsToPlay = Song.getNoteGroupsFromTracks();
        // Have we reached the end of the song?
        if (nextNoteGroupIndexToPlay >= noteGroupsToPlay.length) { // xxx
            Playback.stop();
            return; // DONE!
        }

        currSongTime = currTime - clockStartTime + baseSongTime;

        while (currSongTime >= nextEventPlayTime) { // Inspect the next event
            let noteGroup: NoteGroup = noteGroupsToPlay[nextNoteGroupIndexToPlay];
            Highlight.setTrackAndNoteGroup(noteGroup.trackNumber, noteGroup.noteNumber);

            for (let note of noteGroup.notes) {
                playMIDINote(note.midiNote, note.velocity);
            }

            nextNoteGroupIndexToPlay++; // advance

            // Have we reached the end of the song?
            if (nextNoteGroupIndexToPlay >= noteGroupsToPlay.length) {
                Playback.stop();
                return; // DONE!
            } else {
                determinePlayTimeForNextEvent();
            }
        }

    }

    function determinePlayTimeForNextEvent() {
        let noteGroupsToPlay = Song.getNoteGroupsFromTracks();
        nextEventPlayTime = noteGroupsToPlay[nextNoteGroupIndexToPlay].playTimeMillis;
        if (nextEventPlayTime === -1) {
            nextEventPlayTime = currSongTime + TIME_BETWEEN_NOTEGROUPS; // If the playTime isn't specified, we play the next note every 200ms!
        }
    }

    export function setupButtons() {
        $playButton.click(play);
        $pauseButton.click(pause);
        $stopButton.click(stop);
    }

    /////////////////////////////////////////////////////////////////////////////////
    // Manual Playback of the song or individual tracks.

    export function playNoteAndGoBackwardInTheSong() {
        console.log('playNoteAndGoBackwardInTheSong');
        playActiveNoteGroup();
        // Use the Playback namespace to track the index of the next/prev note to play!!!!!!!!!
        // xxx
    }

    export function playNoteAndGoForwardInTheSong() {
        console.log('playNoteAndGoForwardInTheSong');
        playActiveNoteGroup();
        // xxx
    }

    function playActiveNoteGroup() {
        let t = Highlight.activeTrack();
        let n = Highlight.activeNoteGroup();
        let noteGroup = Song.getNoteGroupFromTrack(n, t);
        if (!noteGroup) {
            return;
        }
        for (let note of noteGroup.notes) {
            playMIDINote(note.midiNote, note.velocity);
        }
        let $noteGroup = $(`#t${t}_n${n}`);
        $noteGroup.addClass('played-note');
        setTimeout(function () {
            $noteGroup.removeClass('played-note');
        }, 400);
    }

    export const playNoteAndGoBackwardOnActiveTrack = _.throttle(function () {
        playActiveNoteGroup();
        Highlight.prevNoteGroup();
    }, 100 /* ms */);

    export const playNoteAndGoForwardOnActiveTrack = _.throttle(function () {
        playActiveNoteGroup();
        Highlight.nextNoteGroup();
    }, 100 /* ms */);
}

function logStatus(msg) {
    $currentStatus.text(msg);
}

function go() {
    UI.setupJQueryDOMReferences();

    LocalStorage.load();

    UI.showNoteGroupsForTracks();

    UI.setupKeyHandlers();
    UI.setupMouseHandlers();

    setupFileChooser();
    setupCopyHandler();

    UI.setupPianoCanvas();
    UI.setupPianoMouseHandlers();
    UI.drawPiano();
}

function setupCopyHandler() {
    document.querySelector('html').addEventListener('copy', function (e: ClipboardEvent) {
        e.preventDefault();
        if (e.clipboardData) {
            let noteGroups = Song.getNoteGroupsFromTracks();
            let text = '// ' + noteGroups.join(' '); // Melody lines start with two slashes.
            e.clipboardData.setData('text/plain', text);
        }
    });
}

namespace UI {

    export function setupJQueryDOMReferences() {
        $sharps = $('#sharps-text');
        $flats = $('#flats-text');
        $currentStatus = $('#current-status');
        $download_midi_link = $('#download_midi_link');
        $download_text_link = $('#download_text_link');
        $playButton = $('#play-button');
        $pauseButton = $('#pause-button');
        $stopButton = $('#stop-button');
    }

    // TODO: When manually editing, only append and modify the last couple of spans. Don't regenerate the entire thing, for performance!
    export function showNoteGroupsForTracks() {
        let numTracks = Song.getNumTracks();
        for (let t = 0; t < numTracks; t++) {
            let trackHTML = '';
            let numNoteGroups = Song.getNumNoteGroupsInTrack(t);;
            let n = 0;
            for (; n < numNoteGroups; n++) {
                let noteGroup = Song.getNoteGroupFromTrack(n, t);
                let multiple = (noteGroup.numNotes > 1) ? ' multiple' : '';
                let noteGroupID = getNoteGroupID(t, n); // t_0_n_0 stands for track 0 notegroup 0
                trackHTML += `<div id="${noteGroupID}" class="notegroup${multiple}">${noteGroup.toString()}</div>`;
            }
            $tracks[t].html(trackHTML);

            if (numNoteGroups > 0) {
                $trackInfos[t].html(`${numNoteGroups}`);
                $(`#track-${t}-container`).removeClass('empty');
            } else { // empty track
                $trackInfos[t].html('');
                UI.setCheckedState(t, false); // Don't check an empty track.
                $(`#track-${t}-container`).addClass('empty');
            }
            $(`#track-${t}-checkbox`).prop('checked', UI.isChecked(t));

            scrollNoteGroupIntoView(t, n); // n is set to the last noteGroup
        }

        Highlight.update();
    }

    ////////////////////////////////////////////////////////////

    // MOUSE & KEYBOARD

    export function setupMouseHandlers() {
        Playback.setupButtons();

        // When we hover over the Download MIDI | TEXT links, we update
        // the href attributes so that we download the correct data.
        $download_midi_link.mouseover(() => {
            // GENERATE THE MIDI FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
            let midi = MIDI.getFileFromTracks();
            let base64Text = btoa(midi); // base 64 encoding
            $download_midi_link.attr('href', 'data:audio/midi;base64,' + base64Text);
        });
        $download_text_link.mouseover(() => {
            // GENERATE THE TEXT FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
            // A textual representation of the song:
            //   V1 => e.g., 40 42 44 45 40.47
            //   V2 => e.g., [24.36 @ 0] [17.29 @ 2730] [36 @ 2904] [41 @ 3029] [44 @ 3152]
            let noteGroups = Song.getNoteGroupsFromTracks();
            let text = '// ' + noteGroups.join(' '); // Melody lines start with two slashes.
            let base64Text = btoa(text); // base 64 encoding
            $download_text_link.attr('href', 'data:text/plain;base64,' + base64Text);
        });

        setupDragAndDropFileUpload();
    }

    function setupDragAndDropFileUpload() {
        let handlers = {
            onDrop: (files, pos) => {
                // console.log('Here are the dropped files', files)
                // console.log('Dropped at coordinates', pos.x, pos.y)
                MIDI.readFile(files[0]); // Get the first file.
            },
            onDragOver: () => {
                $('#bottom-panel').addClass('drag');
            },
            onDragLeave: () => {
                $('#bottom-panel').removeClass('drag');
            }
        }
        DragDrop('html', handlers);
    }

    export function setupKeyHandlers() {
        $(document)
            .bind('keydown', onKeyDownHandler)
            .bind('keyup', onKeyUpHandler);
    }

    function onKeyDownHandler(e) {
        if ($sharps.is(":focus") || $flats.is(":focus")) {
            return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
        }

        let keyCode = e.keyCode;

        // e.metaKey => CMD (91 is LEFT CMD & 93 is RIGHT COMD)
        if (e.metaKey) {
            if (keyCode == 37 || keyCode == 39) {
                // DO NOTHING. Fall through so that we can do CMD + LEFT ARROW and CMD + RIGHT ARROW.
            } else {
                // Ignore when we have the CMD pressed down, so that we can use the browser's hotkeys.
                return;
            }
        }

        sharpOrFlatModifier = 0;
        if (e.ctrlKey) {
            sharpOrFlatModifier = -1;
        }
        if (e.altKey) {
            sharpOrFlatModifier = +1;
        }

        e.preventDefault();
        switch (keyCode) {
            case 13: // ENTER
                Playback.togglePlayPause();
                break;
            case 33: // PAGE UP | fn + UP_ARROW
                console.log('fn + UP');
                // Up an octave.
                octaveOffset++;
                if (octaveOffset > 2) {
                    octaveOffset = 2;
                }
                UI.drawPiano();
                break;
            case 34: // PAGE DOWN | fn + DOWN_ARROW
                console.log('fn + DOWN');
                // Down an octave.
                octaveOffset--;
                if (octaveOffset < -2) {
                    octaveOffset = -2;
                }
                UI.drawPiano();
                break;
            case 36: // HOME | fn + LEFT_ARROW
                Playback.playNoteAndGoBackwardInTheSong(); // Find the previous note to play via round robin.
                break;
            case 35: // END | fn + RIGHT_ARROW
                Playback.playNoteAndGoForwardInTheSong(); // Find the next note to play via round robin.
                break;
            case 112:
                console.log('F1');
                break;
            case 113:
                console.log('F2');
                break;
            case 114:
                console.log('F3');
                break;
            case 115:
                console.log('F4');
                break;
            case 116:
                console.log('F5');
                break;
            case 27: // ESC
                if (e.shiftKey) {
                    resetEverything();
                } else {
                    resetOffset();
                }
                break;
            case 8: // BACKSPACE/DEL
                Song.deleteLastGroup();
                break;
            case 9: // TAB
                Song.mergeLastTwoGroups();
                break;
            case 38: // UP
                Highlight.prevTrack();
                break;
            case 40: // DOWN
                Highlight.nextTrack();
                break;
            case 37: // LEFT
                if (e.metaKey) { // CMD + LEFT
                    Highlight.firstNoteGroup();
                } else {
                    if (e.shiftKey) { // SHIFT + LEFT
                        Playback.playNoteAndGoBackwardOnActiveTrack();
                    } else {
                        Highlight.prevNoteGroup();
                    }
                }
                break;
            case 39: // RIGHT
                if (e.metaKey) { // CMD + RIGHT
                    Highlight.lastNoteGroup();
                } else {
                    if (e.shiftKey) { // SHIFT + RIGHT
                        Playback.playNoteAndGoForwardOnActiveTrack();
                    } else {
                        Highlight.nextNoteGroup();
                    }
                }
                break;
            default:
                if (Keyboard.keyCodeToPianoKeyNumber.hasOwnProperty(keyCode)) {
                    playOneNote(Keyboard.keyCodeToPianoKeyNumber[keyCode]);
                }
                break;
        }
    }

    function onKeyUpHandler(e) {
        // update our sharps / flats
        if ($sharps.is(":focus")) {
            sharps = $sharps.val().toLowerCase();
            LocalStorage.saveSharpsAndFlats();
        } else if ($flats.is(":focus")) {
            flats = $flats.val().toLowerCase();
            LocalStorage.saveSharpsAndFlats();
        } else {
            // Released CTRL or ALT
            if (e.ctrlKey) {
                sharpOrFlatModifier = 0;
            } else if (e.altKey) {
                sharpOrFlatModifier = 0;
            }
        }
    }


    ////////////////////////////////////////////////////////////

    // The checkboxes to choose active tracks.

    let checkboxState: boolean[] = [true]; // every time a checkbox changes state, its boolean value is written into this array.

    export function isChecked(trackNumber): boolean {
        return checkboxState[trackNumber];
    }

    export function checkAllNonEmptyTracks() {
        checkboxState = [];
        let numTracks = Song.getNumTracks();
        for (var t = 0; t < numTracks; t++) {
            if (Song.getNumNoteGroupsInTrack(t) > 0) {
                checkboxState.push(true);
            } else {
                checkboxState.push(false);
            }
        }
    }

    export function setCheckedState(t: number, checked) {
        checkboxState[t] = checked;
    }

    export function setCheckedStateArray(stateArray: boolean[]) {
        checkboxState = stateArray;
    }

    export function getCheckedStateArray() {
        return checkboxState;
    }

    ////////////////////////////////////////////////////////////

    // The Piano Visualization (Canvas 2D)
    const WHITE_KEY_WIDTH = 20;
    const WHITE_KEY_HEIGHT = 120;
    const BLACK_KEY_WIDTH = 16;
    export const BLACK_KEY_HEIGHT = 72;

    let context2d = null;
    let context2dWidth = 0;
    let context2dHeight = 0;

    export function setupPianoCanvas() {
        let elem: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('pianoCanvas');
        context2dWidth = elem.width;
        context2dHeight = elem.height;
        context2d = elem.getContext('2d');
    }

    export function drawPiano() {
        if (!context2d) {
            return;
        }
        let c = context2d;

        // clear the background
        c.fillStyle = "#444";
        c.fillRect(0, 0, context2dWidth, context2dHeight);

        drawWhiteKeys(c);
        drawBlackKeys(c);
        drawKeyLabels(c);
        drawMostRecentGroup(c);
    }

    function drawWhiteKeys(c) {
        c.strokeStyle = '#000';
        c.lineWidth = .2;
        c.fillStyle = '#FFF';

        for (let k = 0; k < 52; k++) {
            c.fillRect(k * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
            c.strokeRect(k * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
        }

        // Highlight Middle C in faint red.
        c.fillStyle = '#FCC';
        c.fillRect(23 * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT);
    }

    function drawBlackKeys(c) {
        c.fillStyle = '#323232';

        for (let octave = 0; octave < 7; octave++) {
            for (let key = 0; key < 7; key++) { // A# = key 0; C# = key 2; G# = key 6
                if (key == 1 || key == 4) {
                    continue; // skip B# and E#
                }

                c.fillRect(12 + 20 * (key + (octave * 7)), 0, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT);
            }
        }

        // highest black key
        c.fillRect(12 + (7 * 7 * 20), 0, 16, 72);
    }

    function drawKeyLabels(c) {
        c.textAlign = 'center';

        // draw the piano key numbers for the white keys
        // also draw the note name
        for (let k = 1; k <= 88; k++) {
            let remainder = k % 12;
            if (_.includes(whiteKeys, remainder)) {
                let octave = Math.floor(k / 12);
                let whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
                let whiteKeyIndex = octave * 7 + whiteKeyNoteIndex;
                let noteLabel = noteLabels[whiteKeyNoteIndex];
                if (noteLabel == "c") {
                    c.font = "bold 13px Tahoma";
                } else {
                    c.font = "13px Tahoma";
                }
                c.fillStyle = "#777";
                c.fillText(noteLabel, whiteKeyIndex * 20 + 10, 100);
                c.font = "12px Consolas";
                c.fillStyle = "#999";
                c.fillText(k, whiteKeyIndex * 20 + 10, 115);
            }
        }

        c.font = "15px Consolas";
        c.fillStyle = "#FFF";
        c.textAlign = 'center';

        // draw the current character to press, under the correct key!
        let offset = (octaveOffset + 1) * 7 - 1; // start on G (key 13)
        let len = Keyboard.labels.length;
        for (let i = 0; i < len; i++) {
            c.fillText(Keyboard.labels[i], (i + offset) * 20 + 10, 140);
        }
    }

    // draw the highlighted group?
    function drawMostRecentGroup(c) {
        let trackNumber = Highlight.activeTrack();
        let noteGroupNumber = Highlight.activeNoteGroup();

        let lastGroup = Song.getNoteGroupFromTrack(noteGroupNumber, trackNumber);
        if (!lastGroup) {
            return;
        }

        let notes: Array<Note> = lastGroup.notes;
        for (let n of notes) {
            let remainder = n.pianoNote % 12;

            let octaveIndex = Math.floor((n.pianoNote - 1) / 12);

            c.beginPath();
            if (_.includes(blackKeys, remainder)) { // is it a black key?
                let blackKeyIndex = (octaveIndex * 7) + blackKeys.indexOf(remainder);
                // black keys are 16px wide
                c.arc(blackKeyIndex * 20 + 20, 60, 6, 0, 2 * Math.PI, false);
            } else {
                // if white, we map it to one of the 52 white keys
                let whiteKeyIndex = (octaveIndex * 7) + whiteKeys.indexOf(remainder);

                // white keys are 20px wide
                c.arc(whiteKeyIndex * 20 + 10, 96, 7, 0, 2 * Math.PI, false);
            }
            c.fillStyle = 'rgba(220,220,10,.82)'; // fill the yellow circle
            c.fill();
        }
    }

    ////////////////////////////////////////////////////////////

    export function setupPianoMouseHandlers() {
        const whiteKeyOffsets = [1, 3, 4, 6, 8, 9, 11]; // A  B  C  D  E  F  G
        const blackKeyOffsets = [2, 0, 5, 7, 0, 10, 12]; // A# _  C# D# _  F# G#

        function getPianoKeyNumberForMouseLocation(x, y): number {
            let octaveOffset = 0;
            if (y <= BLACK_KEY_HEIGHT) {
                // x: 12 + 20 * (key + (octave * 7))
                // y: 0
                // w: BLACK_KEY_WIDTH
                // h: BLACK_KEY_HEIGHT
                let temp = Math.floor((x - 12) / 20);
                octaveOffset = Math.floor(temp / 7);
                let blackKeyNumber = temp % 7;
                let xRelativeToKeyOrigin = (x - 12) % 20;

                if ((xRelativeToKeyOrigin >= 0 && xRelativeToKeyOrigin <= BLACK_KEY_WIDTH) && // Make sure we're within the black key.
                    (blackKeyNumber !== 1 && blackKeyNumber !== 4)) { // There are no black keys at B# and E#.

                    let keyNumber = octaveOffset * 12 + blackKeyOffsets[blackKeyNumber];
                    return keyNumber;
                }
            }

            // WHITE KEYS ONLY
            let whiteKeyNumber = Math.floor(x / 20);
            let remainder = whiteKeyNumber % 7;
            octaveOffset = Math.floor(whiteKeyNumber / 7);
            return octaveOffset * 12 + whiteKeyOffsets[remainder];
        }

        let $piano = $('#pianoCanvas');
        $piano.mousedown(function (e) {
            let offsetLeft = this.offsetLeft;
            let offsetTop = this.offsetTop;

            let x = e.pageX - offsetLeft;
            let y = e.pageY - offsetTop;

            let pianoKeyNumber = getPianoKeyNumberForMouseLocation(x, y);
            let lastKeyNumber = pianoKeyNumber;
            playOneNote(pianoKeyNumber);

            $piano.mousemove(function (e) {
                let x = e.pageX - offsetLeft;
                let y = e.pageY - offsetTop;

                let pianoKeyNumber = getPianoKeyNumberForMouseLocation(x, y);
                if (pianoKeyNumber !== lastKeyNumber) {
                    lastKeyNumber = pianoKeyNumber;
                    playOneNote(pianoKeyNumber);
                }
            });
        });

        $('html').mouseup((e) => {
            $piano.unbind('mousemove');
        })
    }

}

namespace Song {
    let tracks: Array<Track> = [];

    let cachedNoteGroups: NoteGroup[] = null;
    let cacheIsValid = false;

    export function reset() {
        tracks = [];
    }

    export function invalidateCache() {
        cacheIsValid = false;
        cachedNoteGroups = null;
    }

    export function addTrack(trackNumber: number) {
        let track = new Track();
        track.trackNumber = trackNumber;
        tracks.push(track);
    }

    // returns the new length of the track
    export function addNoteGroupToTrack(noteGroup: NoteGroup, trackNumber: number): number {
        invalidateCache(); // Every time we modify the tracks, we need to invalidate the cache.

        let track = tracks[trackNumber];
        noteGroup.trackNumber = trackNumber;
        noteGroup.noteNumber = track.length;
        track.push(noteGroup);
        return tracks[trackNumber].length;
    }

    export function getNumTracks(): number {
        return tracks.length;
    }

    export function getNumNoteGroupsInTrack(t: number) {
        if (t < 0 || t >= tracks.length) {
            return 0;
        } else {
            return tracks[t].length;
        }
    }

    export function getTracksAsJSON(): string {
        return JSON.stringify(tracks);
    }

    export function mergeLastTwoGroups() {
        let trackNumber = Highlight.activeTrack();
        let currTrack = tracks[trackNumber];
        if (currTrack.length >= 2) {
            let mergedNoteGroup: NoteGroup = NoteGroup.merge(currTrack.pop(), currTrack.pop());
            addNoteGroupToTrack(mergedNoteGroup, trackNumber);
            Highlight.setTrackAndNoteGroup(trackNumber, currTrack.length - 1);
            saveAndShowData();
        }
    }

    export function deleteLastGroup() {
        let t = Highlight.activeTrack();
        tracks[t].pop();
        Highlight.setTrackAndNoteGroup(t, tracks[t].length - 1);
        saveAndShowData();
    }

    export function getNoteGroupFromTrack(noteGroupNumber: number, trackNumber: number): NoteGroup {
        if (trackNumber < 0 || trackNumber >= tracks.length) {
            return null;
        }
        let track = tracks[trackNumber];
        if (noteGroupNumber < 0 || noteGroupNumber >= track.length) {
            return null;
        }
        return track[noteGroupNumber];
    }

    // Retrieve the notegroups to play or save to file.
    // The results are cached! We invalidate the cache anytime we add or subtract notes, or change the state of the checkboxes.
    export function getNoteGroupsFromTracks(): NoteGroup[] {
        if (cacheIsValid) {
            console.log('Just return the cached NoteGroups!!!!!!');
            return cachedNoteGroups;
        }

        console.log('Recompute Cached NoteGroups');

        let noteGroups: NoteGroup[] = [];
        let currTimeMillis = 0; // Used when our NoteGroups don't have valid timing information (i.e., manual entry).

        let trackIsChecked: boolean[] = []; // Ignore unchecked tracks.
        let noteGroupNumberPerTrack: number[] = []; // keep pointers to the current NoteGroups we are looking at
        let numTracks = tracks.length;
        for (let t = 0; t < numTracks; t++) {
            trackIsChecked.push(UI.isChecked(t));
            noteGroupNumberPerTrack.push(0);
        }

        // Round robin between the tracks until we insert all the NoteGroups properly. Always choose the NoteGroup with the minimum playTime.
        while (true) {
            let minPlayTime = Number.MAX_VALUE;
            let nextNoteGroup: NoteGroup = null;
            let nextNoteGroupTrack: Track = null; // Which track contains the next note group to play?

            // Loop through all the tracks to find the next NoteGroup to play.
            for (let t = 0; t < numTracks; t++) {
                let currTrack = tracks[t];
                let currNoteGroupNumber = noteGroupNumberPerTrack[t];
                let currTrackLength = currTrack.length;
                if (currTrackLength === 0 || !trackIsChecked[t] || currNoteGroupNumber >= currTrackLength) {
                    continue;
                } else {
                    let noteGroup = currTrack[currNoteGroupNumber];
                    if (noteGroup.playTimeMillis < minPlayTime) {
                        minPlayTime = noteGroup.playTimeMillis;
                        nextNoteGroup = noteGroup;
                        nextNoteGroupTrack = currTrack;
                    }
                }
            }

            // If did not find any NoteGroups, we're done!
            if (!nextNoteGroup) {
                break;
            } else {
                let ng: NoteGroup = nextNoteGroup.copy();
                if (ng.playTimeMillis === -1) {
                    ng.playTimeMillis = currTimeMillis;
                }

                let t = nextNoteGroupTrack.trackNumber;
                let noteNumber = noteGroupNumberPerTrack[t];
                ng.noteNumber = noteNumber;

                noteGroupNumberPerTrack[t]++;

                noteGroups.push(ng);
                currTimeMillis = ng.playTimeMillis + TIME_BETWEEN_NOTEGROUPS;
            }
        }

        cachedNoteGroups = noteGroups;
        cacheIsValid = true;
        return noteGroups;
    }

}

$(function () {
    go();
});