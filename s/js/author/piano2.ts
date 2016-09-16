'use strict';

/////////////////////////////////////////////////////////////////////////////////
// declare types that are defined in 3rd party libraries
declare var $: any;
declare var _: any;
declare var Midi: any; // jsmidgen
declare var MIDIEvents: any;
declare var MIDIFile: any;
declare var DragDrop: any;
declare var Instrument: any;
/////////////////////////////////////////////////////////////////////////////////


// Support multi track MIDI songs.
// When we compose by hand, stick everything in track 0.
let tracks: Array<Track> = [];
let $tracks = []; // jQuery references to the elements. Allows us to modify the DOM.
let $trackInfos = []; // jQuery references to the elements. Allows us to modify the DOM.


let $sharps, $flats;
let sharps = ""; // the string value of the $sharps input
let flats = "";
let octaveOffset = 0;

// jQuery objects representing our download links
let $download_midi_link, $download_text_link;

// piano key numbers % 12
let blackKeys = [2, -1, 5, 7, -1, 10, 0]; // -1 is for the spaces where there are no black keys
let whiteKeys = [1, 3, 4, 6, 8, 9, 11];
let noteLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

// which character to type to get the corresponding white key
let keyboardLabels = [
    '_', 'z', 'x', // G A B
    'c', 'v', 'b', 'n', 'm', ',', '.', // C D E F G A B
    '/', 'a', 's', 'd', 'f', 'g', 'h', // C D E F G A B
    'j', 'k', 'l', ';', 'q', 'w', 'e', // C D E F G A B
    'r', 't', 'y', 'u', 'i', 'o', 'p', // C D E F G A B
    '[', ']', '\\', '1', '2', '3', '4', // C D E F G A B
    '5', '6', '7', '8', '9', '0', '-', // C D E F G A B
    '=' // C
];

// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
function p2m(pianoNote) {
    return pianoNote + 20;
}

function m2p(midiNote) {
    return midiNote - 20;
}

let piano = new Instrument('piano');

// A Track is just an Array of NoteGroups
class Track extends Array<NoteGroup> {
    // NOTHING YET
}

//////////////////////////////////////////////////////////////////////
class NoteGroup {
    notes: Array<Note>;

    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    constructor(a?: Note | string) {
        if (typeof a === 'string') { // e.g., "40.44.47" => C,E,G
            let pianoKeyNotes = [];
            let pianoKeyStrings = a.split('.');
            for (let s of pianoKeyStrings) {
                let n = parseInt(s);
                pianoKeyNotes.push(new Note(n));
            }
            this.notes = pianoKeyNotes;
        } else if (a) {
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

    toString(): string {
        return this.notes.join('.');
    }

    get numNotes(): number {
        return this.notes.length;
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
    saveTracksToLocalStorage();
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
            trackHTML += `<div id="${noteGroupID}" class="notegroup${multiple}">${noteGroup}</div>&nbsp;`;
        }
        $tracks[t].html(trackHTML);

        $trackInfos[t].html(`${numNoteGroups}`);

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
        if (_.contains(blackKeys, remainder)) { // is it a black key?
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
        if (_.contains(whiteKeys, remainder)) {
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

function loadTracksFromLocalStorage() {
    try {
        let savedTracks = JSON.parse(localStorage.getItem('tracks'));
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

function saveTracksToLocalStorage() {
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

function play(keyCode, sharpModifier) {
    // console.log(keyCode);
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

        piano.tone({
            pitch: -p2m(pianoKeyNumber), // This API expects a negative number to indicate a MIDI note.
            duration: 1.0
        });
        saveAndShowData();
    }
}

function setupUI() {
    $sharps = $("#sharps_textarea");
    $flats = $("#flats_textarea");

    loadTracksFromLocalStorage();
    loadSharpsAndFlats();

    showNoteGroupsForTracks();

    setupKeyHandlers();
    setupMouseHandlers();

    drawPiano();
}

function setupKeyHandlers() {
    $(document).bind('keyup', onKeyUpHandler);
    $(document).bind('keydown', onKeyDownHandler);
}

function onKeyUpHandler(e) {
    // update our sharps / flats
    if ($sharps.is(":focus")) {
        sharps = $sharps.val().toLowerCase();
        localStorage.setItem('sharps', sharps);
    } else if ($flats.is(":focus")) {
        flats = $flats.val().toLowerCase();
        localStorage.setItem('flats', flats);
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
            drawPiano();
            break;
        case 40: // DOWN an octave
            octaveOffset--;
            drawPiano();
            break;
        default:
            play(e.keyCode, sharpModifier);
            break;
    }
}

// Currently only supports a single track (Track 0).
// Returns a textual representation of the song (e.g., 40 42 44 45 40.47)
function getTextFileFromTracks(): string {
    let noteGroupStrings: string[] = [];
    for (let noteGroup of tracks[0]) {
        noteGroupStrings.push(noteGroup.toString());
    }

    // Melody lines start with two slashes.
    return '// ' + noteGroupStrings.join(' ');
}

// Use jsmidgen to create a MIDI file that we can encode in base 64.
// https://github.com/dingram/jsmidgen
function getMIDIFileFromTracks(): string {
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

function setupMouseHandlers() {
    // When we hover over the Download MIDI | TEXT links, we should update
    // the href attributes so that we download the correct data.

    $download_midi_link = $('#download_midi_link');
    $download_text_link = $('#download_text_link');

    $download_midi_link.mouseover(() => {
        // GENERATE THE MIDI FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        let midi = getMIDIFileFromTracks();
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

// parse input midi files
// create output midi files
function setupMIDIFileSupport() {
    // jsmidgen
    // https://github.com/dingram/jsmidgen
    var file = new Midi.File();
    var track = new Midi.Track();
    track.setTempo(60); // BPM
    file.addTrack(track);

    var duration = 128; // 128 ticks == quarter note
    track.addNote(0, p2m(40), duration, 64 /* time since previous event */); // C4 == MIDI NOTE 60
    track.addNote(0, p2m(42), duration);
    track.addNote(0, p2m(44), duration);
    track.addNote(0, p2m(45), duration);
    track.addNote(0, p2m(47), duration);


    setupDragAndDrop();
    setupFileChooser();
}

function displayFileInfo(file) {
    $('#file-info').text(`Loaded File: ${file.name} | Size: ${file.size} bytes`);
}

function setupDragAndDrop() {
    let handlers = {
        onDrop: (files, pos) => {
            // console.log('Here are the dropped files', files)
            // console.log('Dropped at coordinates', pos.x, pos.y)
            readMIDIFile(files[0]); // Get the first file.
        },
        onDragOver: () => {
            $('#drag-and-drop-target').addClass('drag');
        },
        onDragLeave: () => {
            $('#drag-and-drop-target').removeClass('drag');
        }
    }
    DragDrop('html', handlers);
}

function setupFileChooser() {
    $('#filechooser').change((e) => {
        let files = e.target.files;
        if (files.length > 0) {
            readMIDIFile(files[0]); // Get the first file.
        }
    });
}

function readMIDIFile(file) {
    let reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
        let arrayBuffer = e.target.result;
        displayFileInfo(file);
        loadMIDIFile(arrayBuffer);
    });
    reader.addEventListener('error', (err) => {
        console.error('FileReader error' + err)
    });
    reader.readAsArrayBuffer(file);
}

function loadMIDIFile(arrayBuffer) {
    stopCurrentPlayback();

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

    loadMIDITracks(midiFile, midiFile.tracks);
    console.log();

    var lyrics = midiFile.getLyrics();
    if (lyrics.length > 0) {
        console.log(`Lyrics Track ${lyrics.length} events.`);
        // Each Lyrics Event has a .playTime and .text property.
    }

    let events = midiFile.getEvents( /* type, subtype */);
    let lastEvent = events[events.length - 1];
    let durationInMillis = lastEvent.playTime;
    let durationInSeconds = durationInMillis / 1000;

    console.log(`Duration: ${durationInSeconds} seconds.`);

    displaySongInfo({
        numTracks: numTracks,
        duration: durationInSeconds
    });

    // xxx
    // Start the MIDI playback.
    // currentRAFID = requestAnimationFrame(setupPlayback);
}

function loadMIDITracks(midiFile, midiTracks) {
    let numTracks = midiTracks.length;
    setupTracks(numTracks);
    for (let t = 0; t < numTracks; t++) {
        let track = midiTracks[t];
        let trackEvents = midiFile.getTrackEvents(t);
        console.log(`Track ${t} has ${trackEvents.length} events.`);

        let numOtherMidiEvents = 0;
        let numOtherEvents = 0;

        for (let event of trackEvents) {
            let type = event.type;
            let subtype = event.subtype;
            let status = (event.subtype << 4) + event.channel;
            let statusCodeHexString = '0x' + status.toString(16).toUpperCase();
            let data1 = event.param1;
            let data2 = event.param2;
            let time = event.playTime; // time in milliseconds

            if (type === MIDIEvents.EVENT_MIDI) {
                if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                    let midiNoteNum = data1;
                    let pianoNoteNum = m2p(data1);
                    let velocity = data2;

                    // Only handle NOTE_ON events for now.
                    // TODO: figure out which notes start at the same time (or are within some time threshold)
                    tracks[t].push(new NoteGroup(new Note(pianoNoteNum)));
                    console.log(`Track ${t} Note ON`);
                } else if (subtype === MIDIEvents.EVENT_MIDI_NOTE_OFF) {
                    console.log(`Track ${t} Note OFF`);
                } else {
                    console.log(`Track ${t} ${getTypeString(type)}.${getSubTypeString(subtype)}`);
                    numOtherMidiEvents++;
                }
            } else {
                console.log(`Track ${t} ${getTypeString(type)}.${getSubTypeString(subtype)}`);
                numOtherEvents++;
            }
        }

        console.log(`Track ${t} has ${numOtherMidiEvents} other MIDI events and ${numOtherEvents} other events.`);

        // console.log(`Type: ${getTypeString(type)} Subtype: ${getSubTypeString(subtype)} Status: ${statusCodeHexString}, Data_1: ${data1}, Data_2: ${data2}, Event Time: ${time}, Curr Time: ${currTime}`);


        // TODO: load the note numbers into each track at the correct spacing?
    }

    saveAndShowData();
}

function displaySongInfo(params) {
    let duration = Math.round(params.duration * 100) / 100;
    $('#song-info').text(`Num Tracks: ${params.numTracks} | Duration: ${duration} secs`);
}

let midiFile = null;
let startTime = 0;
let eventsToReplay = null;
let currentRAFID = 0;

function stopCurrentPlayback() {
    if (currentRAFID) {
        cancelAnimationFrame(currentRAFID);
        currentRAFID = 0;
    }
}

function setupPlayback(timeMillis) {
    startTime = timeMillis;
    eventsToReplay = midiFile.getEvents();
    currentRAFID = requestAnimationFrame(playNextEvents);
}

// Will be called every ~16.67ms if your display runs at 60 FPS.
function playNextEvents(timeMillis) {
    // Have we reached the end of the song?
    if (eventsToReplay.length === 0) {
        stopCurrentPlayback();
        return; // DONE!
    }

    let currTime = timeMillis - startTime;
    while (currTime >= eventsToReplay[0].playTime) {
        let event = eventsToReplay.shift();
        let type = event.type;
        let subtype = event.subtype;
        let status = (event.subtype << 4) + event.channel;
        let statusCodeHexString = '0x' + status.toString(16).toUpperCase();
        let data1 = event.param1;
        let data2 = event.param2;
        let time = event.playTime; // time in milliseconds
        // console.log(`Type: ${getTypeString(type)} Subtype: ${getSubTypeString(subtype)} Status: ${statusCodeHexString}, Data_1: ${data1}, Data_2: ${data2}, Event Time: ${time}, Curr Time: ${currTime}`);

        if (type === MIDIEvents.EVENT_MIDI) {
            if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                playMIDINote(data1, data2);
            } else if (subtype === MIDIEvents.EVENT_MIDI_NOTE_OFF) {
                stopMIDINote(data1);
            }
        }

        // Have we reached the end of the song?
        if (eventsToReplay.length === 0) {
            stopCurrentPlayback();
            return; // DONE!
        }
    }

    currentRAFID = requestAnimationFrame(playNextEvents);
}

function playMIDINote(midiNoteNum, velocity) {
    piano.tone({
        pitch: -midiNoteNum, // This API expects negative numbers to indicate MIDI notes. Positive numbers indicate audio tone frequency (Hz).
        duration: 2.0, // 0.125, 0.25, 0.5, 1.0, 2.0
        velocity: (velocity / 127.0)
    });
}

function stopMIDINote(midiNoteNum) {
    // NOTHING FOR NOW
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


let Colors = {
    setup() {
        this.colors = [];
        this.numColors = 20;
        for (let i = 0; i < this.numColors; i++) {
            this.colors.push(this.getRainbow(this.numColors, i));
        }
    },
    getRandom() {
        return this.colors[Math.floor(Math.random() * this.numColors)];
    },
    getRainbow(numOfSteps, step) {
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6); // ~~ => Math.floor
        var f = h * 6 - i;
        var q = 1 - f;
        var max = 0.8;
        var min = 0.1;
        switch (i % 6) {
            case 0: r = max; g = f; b = min; break;
            case 1: r = q; g = max; b = min; break;
            case 2: r = min; g = max; b = f; break;
            case 3: r = min; g = q; b = max; break;
            case 4: r = f; g = min; b = max; break;
            case 5: r = max; g = min; b = q; break;
        }
        var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
        return (c);
    }
};

$(function () {
    Colors.setup();
    setupUI();
    setupMIDIFileSupport();
});

