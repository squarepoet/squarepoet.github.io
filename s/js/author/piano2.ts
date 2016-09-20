'use strict';

/////////////////////////////////////////////////////////////////////////////////
// declare types that are defined in 3rd party libraries
declare var $: any;
declare var _: any;
declare var DragDrop: any;
declare var Instrument: any;
/////////////////////////////////////////////////////////////////////////////////

const TIME_BETWEEN_NOTEGROUPS = 250;
const TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES = 0; // Adjust this for parsing MIDI recordings of piano performances (i.e., imprecise timing).

// Support multi track MIDI songs.
// When we compose by hand, stick everything in track 0.
let tracks: Array<Track> = [];
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

// which character to type to get the corresponding white key
let keyboardLabels = [
    '␣', 'z', 'x', // G A B
    'c', 'v', 'b', 'n', 'm', ',', '.', // C D E F G A B
    '/', 'a', 's', 'd', 'f', 'g', 'h', // C D E F G A B
    'j', 'k', 'l', ';', 'q', 'w', 'e', // C D E F G A B
    'r', 't', 'y', 'u', 'i', 'o', 'p', // C D E F G A B
    '[', ']', '\\', '1', '2', '3', '4', // C D E F G A B
    '5', '6', '7', '8', '9', '0', '-', // C D E F G A B
    '=' // C
];

let pianoInstrument = new Instrument('piano'); // musical.js

// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
function p2m(pianoNote) {
    return pianoNote + 20;
}

function m2p(midiNote) {
    return midiNote - 20;
}


// A Track is just an Array of NoteGroups
class Track extends Array<NoteGroup> {
    // NOTHING YET
}

//////////////////////////////////////////////////////////////////////
class NoteGroup {

    notes: Array<Note>;
    playTimeMillis: number = -1;
    trackNumber: number = 0; // Which MIDI track was this NoteGroup extracted from?

    // NoteGroup looks like: 40.44.47 or [40.44.47 @ 1530]
    // The number after the @ indicates the playback time of the NoteGroup, in milliseconds.

    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    constructor(a?: Note | string, playTimeMillis: number = -1, trackNumber: number = 0) {
        this.playTimeMillis = playTimeMillis;
        this.trackNumber = trackNumber;
        if (typeof a === 'string') { // e.g., "40.44.47" => C,E,G
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
        } else if (a) { // a single Note object
            this.notes = [a];
        } else {
            this.notes = [];
        }
    }

    addNote(n: Note) {
        this.notes.push(n);
        let len = this.notes.length;
        if (len > 1) { // If the notes array contains more than one item, we need to sort and unique the notes.
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
            return this.notes.join('.'); // Use the simple format when playTimeMillis is not specified (i.e. -1).
        } else {
            return `[${this.notes.join('.')} @ ${this.playTimeMillis}]`; // V2 contains the playTime for each NoteGroup
        }
    }

    // V1 of our Tiny Piano Song format does not contain the playTime
    // toString(): string {
    //     return this.notes.join('.');
    // }

    get numNotes(): number {
        return this.notes.length;
    }

    copy(): NoteGroup {
        let clone = new NoteGroup(this.toString());
        clone.playTimeMillis = this.playTimeMillis;
        clone.trackNumber = this.trackNumber;
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
//////////////////////////////////////////////////////////////////////
class Note {
    pianoNote: number;
    midiNote: number;
    durationInMillis: number;
    velocity: number;

    constructor(pianoNote, durationInMillis = 1000, velocity = 127) {
        this.pianoNote = pianoNote;
        this.midiNote = pianoNote + 20;
        this.durationInMillis = durationInMillis;
        this.velocity = velocity;
    }

    toString(): string {
        return this.pianoNote + '';
    }

    static compare(a: Note, b: Note): number {
        return a.pianoNote - b.pianoNote; // sort from smallest number to highest number
    }
}
//////////////////////////////////////////////////////////////////////

let keyCodeToPianoKey = {
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

// resets the key offset
function resetOffset() {
    console.log("Reset Offsets");
    octaveOffset = 0;
    drawPiano();
}

function resetEverything() {
    console.log("Reset Everything!");
    octaveOffset = 0;
    setupTracks(1);
    saveAndShowData();
}

function addTracks(numTracks) {
    let html = '';
    for (let i = 0; i < numTracks; i++) {
        tracks.push([]); // Add one array for each track. Tracks contain NoteGroups.
        let checkbox = `<input id="track-${i}-checkbox" type="checkbox" checked class="checkbox">`;
        let info = `<div id="track-${i}-info" class="track-info"></div>`;
        html += `${checkbox}${info}<div id="track-${i}" class="track"></div><br>`; // Also add the corresponding DOM elements.
    }
    $('#tracks').html(html);

    for (let i = 0; i < numTracks; i++) {
        $tracks.push($(`#track-${i}`));
        $trackInfos.push($(`#track-${i}-info`));
    }
}

function deleteLastGroup() {
    // TODO: do this for the currently focused track.
    // TODO: make it obvious which track is focused with a red border
    tracks[0].pop();
    saveAndShowData();
}

function saveAndShowData() {
    LocalStorage.saveTracks();
    showNoteGroupsForTracks();
    drawPiano();
}

// TODO: When manually editing, only append and modify the last couple of spans. Don't regenerate the entire thing, for performance!
function showNoteGroupsForTracks() {
    let numTracks = tracks.length;
    for (let t = 0; t < numTracks; t++) {
        let trackHTML = '';
        let noteGroupID = '';
        let currTrack = tracks[t];
        let numNoteGroups = currTrack.length;
        for (let n = 0; n < numNoteGroups; n++) {
            let noteGroup = currTrack[n];
            let multiple = (noteGroup.numNotes > 1) ? ' multiple' : '';
            noteGroupID = `t_${t}_n_${n}`; // t_0_n_0 stands for track 0 notegroup 0
            trackHTML += `<div id="${noteGroupID}" class="notegroup${multiple}">${noteGroup.toString()}</div>&nbsp;`;
        }
        $tracks[t].html(trackHTML);

        if (numNoteGroups > 0) {
            $trackInfos[t].html(`${numNoteGroups}`);
        } else {
            $trackInfos[t].html('');
        }

        // Scroll the divs all the way to the right to make sure the most recent NoteGroups are visible.
        let element = $(`#${noteGroupID}`)[0];
        if (element) {
            element.scrollIntoView();
        }
    }

}

function mergeLastTwoGroups() {
    if (tracks[0].length >= 2) {
        var merged: NoteGroup = NoteGroup.merge(tracks[0].pop(), tracks[0].pop());
        tracks[0].push(merged);
        saveAndShowData();
    }
}

function drawWhiteKeys(c) {
    c.strokeStyle = '#000';
    c.lineWidth = .2;
    c.fillStyle = '#FFF';

    for (var k = 0; k < 52; k++) {
        c.fillRect(k * 20, 0, 20, 120);
        c.strokeRect(k * 20, 0, 20, 120);
    }

    c.fillStyle = '#FCC';
    c.fillRect(23 * 20, 0, 20, 120);
}

function drawBlackKeys(c) {
    c.fillStyle = '#323232';

    for (var octave = 0; octave < 7; octave++) {
        for (var key = 0; key < 7; key++) {
            if (key == 1 || key == 4) {
                continue; // skip B# and E#
            }

            c.fillRect(12 + 20 * (key + (octave * 7)), 0, 16, 72);
        }
    }

    // highest black key
    c.fillRect(12 + (7 * 7 * 20), 0, 16, 72);
}

function drawMostRecentGroup(c) {
    var lastGroup = tracks[0].slice(-1); // array of the last item
    if (lastGroup.length == 0) {
        return;
    }

    var notes: Array<Note> = lastGroup[0].notes;
    for (let n of notes) {
        var remainder = n.pianoNote % 12;

        var octaveIndex = Math.floor((n.pianoNote - 1) / 12);

        c.beginPath();
        if (_.includes(blackKeys, remainder)) { // is it a black key?
            var blackKeyIndex = (octaveIndex * 7) + blackKeys.indexOf(remainder);
            // black keys are 16px wide
            c.arc(blackKeyIndex * 20 + 20, 60, 6, 0, 2 * Math.PI, false);
        } else {
            // if white, we map it to one of the 52 white keys
            var whiteKeyIndex = (octaveIndex * 7) + whiteKeys.indexOf(remainder);

            // white keys are 20px wide
            c.arc(whiteKeyIndex * 20 + 10, 96, 7, 0, 2 * Math.PI, false);
        }
        c.fillStyle = 'rgba(220,220,10,.82)'; // fill the yellow circle
        c.fill();
    }
}

function drawPiano() {
    var elem: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('pianoCanvas');
    if (!elem || !elem.getContext) {
        return;
    }
    var c = elem.getContext('2d');
    if (!c) {
        return;
    }

    // clear the background
    c.fillStyle = "#444";
    c.fillRect(0, 0, elem.width, elem.height);

    drawWhiteKeys(c);
    drawBlackKeys(c);
    drawKeyLabels(c);
    drawMostRecentGroup(c);
}

function drawKeyLabels(c) {
    c.textAlign = 'center';

    // draw the piano key numbers for the white keys
    // also draw the note name
    for (var k = 1; k <= 88; k++) {
        var remainder = k % 12;
        if (_.includes(whiteKeys, remainder)) {
            var octave = Math.floor(k / 12);
            var whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
            var whiteKeyIndex = octave * 7 + whiteKeyNoteIndex;
            var noteLabel = noteLabels[whiteKeyNoteIndex];
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
    var offset = (octaveOffset + 1) * 7 - 1; // start on G (key 13)
    var len = keyboardLabels.length;
    for (var i = 0; i < len; i++) {
        c.fillText(keyboardLabels[i], (i + offset) * 20 + 10, 140);
    }
}

namespace LocalStorage {

    export function load() {
        loadTracks();
        loadSharpsAndFlats();
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

            for (let i = 0; i < numTracks; i++) {
                let savedTrack = savedTracks[i];
                for (let noteGroupString of savedTrack) {
                    tracks[i].push(new NoteGroup(noteGroupString));
                }
            }

        } catch (e) {
            setupTracks(1);
        }
    }

    export function saveTracks() {
        let tracksToSave = [];
        for (let sourceTrack of tracks) {
            let destTrack = [];
            tracksToSave.push(destTrack);
            for (let noteGroup of sourceTrack) {
                destTrack.push(noteGroup.toString());
            }
        }
        localStorage.setItem('tracks', JSON.stringify(tracksToSave));
    }

    export function saveSharpsAndFlats() {
        localStorage.setItem('sharps', sharps);
        localStorage.setItem('flats', flats);
    }
}


function play(keyCode, sharpModifier) {
    if (keyCodeToPianoKey.hasOwnProperty(keyCode)) {
        // get the name of the note we are about to play
        var remainder = keyCodeToPianoKey[keyCode] % 12;
        var whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
        var noteLabel = noteLabels[whiteKeyNoteIndex];

        // is this note auto-sharped, due to the key signature?
        if (sharps.indexOf(noteLabel) != -1) {
            sharpModifier++; // raise the sharp a half-step!
        }
        // is this note auto-flatted, due to the key signature?
        if (flats.indexOf(noteLabel) != -1) {
            sharpModifier--; // lower the note a half-step!
        }


        var pianoKeyNumber = keyCodeToPianoKey[keyCode] + sharpModifier + (octaveOffset * 12);
        if (pianoKeyNumber < 1 || pianoKeyNumber > 88) {
            return;
        }

        tracks[0].push(new NoteGroup(new Note(pianoKeyNumber)));

        playMIDINote(p2m(pianoKeyNumber));
        saveAndShowData();
    }
}

function setupKeyHandlers() {
    $(document).bind('keyup', onKeyUpHandler);
    $(document).bind('keydown', onKeyDownHandler);
}

function onKeyUpHandler(e) {
    // update our sharps / flats
    if ($sharps.is(":focus")) {
        sharps = $sharps.val().toLowerCase();
        LocalStorage.saveSharpsAndFlats();
    } else if ($flats.is(":focus")) {
        flats = $flats.val().toLowerCase();
        LocalStorage.saveSharpsAndFlats();
    }
}

function onKeyDownHandler(e) {
    if ($sharps.is(":focus") || $flats.is(":focus")) {
        return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
    }

    if (e.keyCode == 91 || e.keyCode == 93) { // CMD KEY on Mac
        // NOTHING
    }

    if (e.metaKey) { // CMD
        if (e.keyCode == 88 || e.keyCode == 67) { // CMD + X or CMD + C
            // NOTHING
        }
        return;
    }

    if (e.altKey) {
        return;
    }

    var sharpModifier = 0;
    if (e.ctrlKey) {
        sharpModifier = -1;
    } else if (e.shiftKey) {
        sharpModifier = +1;
    }

    e.preventDefault();
    switch (e.keyCode) {
        case 13: // ENTER
            Playback.togglePlayPause();
            break;
        case 33: // PAGE UP | fn + UP_ARROW
            console.log('fn + UP');
            break;
        case 34: // PAGE DOWN | fn + DOWN_ARROW
            console.log('fn + DOWN');
            break;
        case 36: // HOME | fn + LEFT_ARROW
            console.log('fn + LEFT');
            break;
        case 35: // END | fn + RIGHT_ARROW
            console.log('fn + RIGHT');
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
            deleteLastGroup();
            break;
        case 9: // TAB
            mergeLastTwoGroups();
            break;
        case 38: // UP an octave
            octaveOffset++;
            if (octaveOffset > 2) {
                octaveOffset = 2;
            }
            drawPiano();
            break;
        case 40: // DOWN an octave
            octaveOffset--;
            if (octaveOffset < -2) {
                octaveOffset = -2;
            }
            drawPiano();
            break;
        default:
            play(e.keyCode, sharpModifier);
            break;
    }
}

// Returns a textual representation of the song (e.g., 40 42 44 45 40.47)
function getTextFileFromTracks(): string {
    let numTracks = tracks.length;
    let noteGroupStrings: string[] = [];
    if (numTracks === 1) {
        let track = tracks[0];
        for (let noteGroup of track) {
            noteGroupStrings.push(noteGroup.toString());
        }
    } else {
        // Round robin through all the tracks, looking for the next event to play.
        while (true) {
            let minPlayTime = Number.MAX_VALUE;
            let nextNoteGroup = null;
            let nextNoteGroupTrack = null; // Which track contains the next note group to play?

            // Loop through all the tracks to find the next NoteGroup to play.
            for (let t = 0; t < numTracks; t++) {
                let currTrack = tracks[t];
                if (currTrack.length === 0) {
                    continue;
                } else {
                    let noteGroup = currTrack[0];
                    if (noteGroup.playTimeMillis < minPlayTime) {
                        nextNoteGroup = noteGroup;
                        nextNoteGroupTrack = currTrack;
                    }
                }
            }

            // If did not find any NoteGroups, we're done!
            if (!nextNoteGroup) {
                break;
            } else {
                noteGroupStrings.push(nextNoteGroup.toString());
                nextNoteGroupTrack.shift(); // remove the first item.
            }
        }

    }

    // Melody lines start with two slashes.
    return '// ' + noteGroupStrings.join(' ');
}


function setupMouseHandlers() {
    Playback.setupButtons();

    // When we hover over the Download MIDI | TEXT links, we should update
    // the href attributes so that we download the correct data.

    $download_midi_link.mouseover(() => {
        // GENERATE THE MIDI FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        let midi = MIDI.getFileFromTracks();
        let base64Text = btoa(midi); // base 64 encoding
        $download_midi_link.attr('href', 'data:audio/midi;base64,' + base64Text);
    });
    $download_text_link.mouseover(() => {
        // GENERATE THE TEXT FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        // Assume a single track for now.
        let text = getTextFileFromTracks();
        let base64Text = btoa(text); // base 64 encoding
        $download_text_link.attr('href', 'data:text/plain;base64,' + base64Text);
    });
}

function setupTracks(numTracks: number) {
    tracks = [];
    $tracks = [];
    $trackInfos = [];
    addTracks(numTracks);
}

function displayFileInfo(file) {
    $('#file-info').text(`Loaded File: ${file.name} | Size: ${file.size} bytes`);
}

function setupDragAndDrop() {
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

function setupFileChooser() {
    $('#filechooser').change((e) => {
        let files = e.target.files;
        if (files.length > 0) {
            MIDI.readFile(files[0]); // Get the first file.
        }
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

// Wrap all our various MIDI APIs into a single namespace.
namespace MIDI {

    // Third Party Libraries
    declare var Midi: any; // jsmidgen
    declare var MIDIEvents: any;
    declare var MIDIFile: any;

    let midiFile = null;
    let midiEvents = null;

    export function hasLoadedAFile(): boolean {
        return midiFile !== null;
    }

    // Use jsmidgen to create a MIDI file that we can encode in base 64.
    // https://github.com/dingram/jsmidgen
    export function getFileFromTracks(): string {
        let file = new Midi.File();
        let track = new Midi.Track();
        track.setTempo(120); // BPM
        file.addTrack(track);

        let duration = 32; // 128 ticks == quarter note == 1 beat; 64 ticks == eighth note
        let timeSincePreviousEvent = 0; // 32 ticks == 1/4 beat gap between notes.

        let channel = 0;

        for (let noteGroup of tracks[0]) {
            noteGroup.notes.forEach((note, index) => {
                if (index === 0) {
                    track.noteOn(channel, note.midiNote, timeSincePreviousEvent, 127 /* velocity */);
                } else {
                    // Since we are playing a chord, other notes of this NoteGroup start at the same time.
                    // Thus, the timeSincePreviousEvent == 0
                    track.noteOn(channel, note.midiNote, 0, 127 /* velocity */);
                }
            });
            noteGroup.notes.forEach((note, index) => {
                if (index === 0) {
                    // timeSincePreviousEvent == duration of the note.
                    track.noteOff(channel, note.midiNote, duration);
                } else {
                    // Since we are stopping the chord, other notes of this NoteGroup stop at the same time.
                    // Thus, the timeSincePreviousEvent == 0
                    track.noteOff(channel, note.midiNote, 0);
                }
            });
        }
        return file.toBytes();
    }

    // Convert from MIDI events to NoteGroups
    export function getNoteGroupsFromFile() {
        midiEvents = midiFile.getMidiEvents();

        let noteGroups: Track = [];

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
            let midiNoteNum = event.param1;
            let velocity = event.param2;
            let pianoNoteNum = m2p(midiNoteNum);
            let noteToPlay = new Note(pianoNoteNum, 1.0 /* duration */, velocity);

            if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                if ((playTime <= lastPlayTime + TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES) &&
                    trackNumber === lastTrackNumber) {
                    // Merge all notes starting at the same time and on the same track into a single NoteGroup.
                    lastNoteGroup.addNote(noteToPlay);
                } else {
                    let noteGroup = new NoteGroup(noteToPlay, playTime, trackNumber);
                    noteGroups.push(noteGroup);
                    lastNoteGroup = noteGroup;
                    lastTrackNumber = trackNumber;
                    lastPlayTime = playTime;
                }
            }
        }
        return noteGroups;
    }

    function parseData(arrayBuffer) {
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
        console.log();

        var lyrics = midiFile.getLyrics();
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

        let noteGroups = getNoteGroupsFromFile();
        for (let noteGroup of noteGroups) {
            let trackNumber = noteGroup.trackNumber;
            tracks[trackNumber].push(noteGroup.copy());
            // TODO: load the note numbers into each track at the correct spacing due to .playTime?
        }

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
    // let rafStartTime = 0;

    // let rafID = 0; // Keep a handle on the requestAnimationFrame ID so that we can stop it when the user presses PAUSE or STOP.

    let clock = new Worker('/s/js/author/piano2worker.js');
    let clockIsTicking = false;

    clock.onmessage = function (e) {
        playNextEvents(performance.now());
    };

    let noteGroupsToPlay: NoteGroup[] = [];

    let isPaused = false;

    let nextEventPlayTime = 0;

    export function isPlaying() {
        return clockIsTicking;
        // return rafID !== 0;
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
            // TODO: Only play back the tracks that are checked!
            if (MIDI.hasLoadedAFile()) {
                noteGroupsToPlay = MIDI.getNoteGroupsFromFile();
            } else {
                noteGroupsToPlay = getNoteGroupsFromTracks();
            }

            if (noteGroupsToPlay.length === 0) {
                Playback.stop();
                return; // DONE!
            }

            currSongTime = 0;
            baseSongTime = 0;
            determinePlayTimeForNextEvent();
        }
        // Call RAF once to set the start time.
        // rafID = requestAnimationFrame((rafCurrTime) => {
        //     rafStartTime = rafCurrTime;
        //     // After the start time is set, we can begin playing the events!
        //     rafID = requestAnimationFrame(playNextEvents);
        // });
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
        noteGroupsToPlay = [];
    }

    function stopTheClock() {
        if (isPlaying()) {
            clock.postMessage('stop');
            clockIsTicking = false;
            // cancelAnimationFrame(rafID);
            // rafID = 0;
        }
    }

    // Will be called every ~16.67ms if your display runs at 60 FPS.
    function playNextEvents(currTime) {
        // Have we reached the end of the song?
        if (noteGroupsToPlay.length === 0) {
            Playback.stop();
            return; // DONE!
        }

        currSongTime = currTime - clockStartTime + baseSongTime;

        // currSongTime = rafCurrTime - rafStartTime + baseSongTime;
        while (currSongTime >= nextEventPlayTime) { // Inspect the next event (at index 0).
            let noteGroup: NoteGroup = noteGroupsToPlay.shift();

            for (let note of noteGroup.notes) {
                playMIDINote(note.midiNote, note.velocity);
            }

            // Have we reached the end of the song?
            if (noteGroupsToPlay.length === 0) {
                Playback.stop();
                return; // DONE!
            } else {
                determinePlayTimeForNextEvent();
            }
        }

        // rafID = requestAnimationFrame(playNextEvents);
    }

    function determinePlayTimeForNextEvent() {
        nextEventPlayTime = noteGroupsToPlay[0].playTimeMillis;
        if (nextEventPlayTime === -1) {
            nextEventPlayTime = currSongTime + TIME_BETWEEN_NOTEGROUPS; // If the playTime isn't specified, we play the next note every 200ms!
        }
    }

    export function setupButtons() {
        $playButton.click(play);
        $pauseButton.click(pause);
        $stopButton.click(stop);
    }
}

function getNoteGroupsFromTracks() {
    let noteGroups = [];

    let currTime = 0;

    // TODO: Loop through all tracks for the minimum playTime. Round robin between the tracks until we insert all the notegroups properly... Merge noteGroups appropriately.

    for (let track of tracks) {
        for (let noteGroup of track) {
            let noteGroupCopy = noteGroup.copy();
            if (noteGroupCopy.playTimeMillis === -1) {
                noteGroupCopy.playTimeMillis = currTime;
            }
            noteGroups.push(noteGroupCopy);
            currTime += TIME_BETWEEN_NOTEGROUPS;
        }
    }
    return noteGroups;
}

function logStatus(msg) {
    $currentStatus.text(msg);
}

function setupJQueryDOMReferences() {
    $sharps = $('#sharps-text');
    $flats = $('#flats-text');
    $currentStatus = $('#current-status');
    $download_midi_link = $('#download_midi_link');
    $download_text_link = $('#download_text_link');
    $playButton = $('#play-button');
    $pauseButton = $('#pause-button');
    $stopButton = $('#stop-button');
}

function go() {
    setupJQueryDOMReferences();

    LocalStorage.load();

    showNoteGroupsForTracks();

    setupKeyHandlers();
    setupMouseHandlers();

    setupDragAndDrop();
    setupFileChooser();

    drawPiano();
}

$(function () {
    go();
});
