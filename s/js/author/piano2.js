'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/////////////////////////////////////////////////////////////////////////////////
var TIME_BETWEEN_NOTEGROUPS = 220;
// Support multi track MIDI songs.
// When we compose by hand, stick everything in track 0.
var tracks = [];
var $tracks = []; // jQuery references to the elements. Allows us to modify the DOM.
var $trackInfos = []; // jQuery references to the elements. Allows us to modify the DOM.
var $sharps, $flats;
var sharps = ""; // the string value of the $sharps input
var flats = "";
var octaveOffset = 0;
// jQuery objects representing our download links
var $download_midi_link, $download_text_link;
// piano key numbers % 12
var blackKeys = [2, -1, 5, 7, -1, 10, 0]; // -1 is for the spaces where there are no black keys
var whiteKeys = [1, 3, 4, 6, 8, 9, 11];
var noteLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
// which character to type to get the corresponding white key
var keyboardLabels = [
    '␣', 'z', 'x',
    'c', 'v', 'b', 'n', 'm', ',', '.',
    '/', 'a', 's', 'd', 'f', 'g', 'h',
    'j', 'k', 'l', ';', 'q', 'w', 'e',
    'r', 't', 'y', 'u', 'i', 'o', 'p',
    '[', ']', '\\', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '0', '-',
    '=' // C
];
// For MIDI playback.
var midiFile = null;
var pianoInstrument = new Instrument('piano'); // musical.js
// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
function p2m(pianoNote) {
    return pianoNote + 20;
}
function m2p(midiNote) {
    return midiNote - 20;
}
// A Track is just an Array of NoteGroups
var Track = (function (_super) {
    __extends(Track, _super);
    function Track() {
        _super.apply(this, arguments);
    }
    return Track;
}(Array));
//////////////////////////////////////////////////////////////////////
var NoteGroup = (function () {
    // NoteGroup looks like: 40.44.47 or [40.44.47 @ 1530]
    // The number after the @ indicates the playback time of the NoteGroup, in milliseconds.
    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    function NoteGroup(a, playTimeMillis) {
        if (playTimeMillis === void 0) { playTimeMillis = 0; }
        this.playTimeMillis = 0;
        this.midiTrackNumber = 0;
        this.playTimeMillis = playTimeMillis;
        if (typeof a === 'string') {
            var noteGroupString = a;
            if (noteGroupString.indexOf('[') !== -1) {
                var pattern = /\[\s*(.+)\s*\@\s*(.+)\s*\]/;
                var match = pattern.exec(noteGroupString);
                noteGroupString = match[1]; // e.g., 40.44.47
                var timeString = match[2]; // e.g., 1530
                this.playTimeMillis = parseFloat(timeString); // override the playTime if we specified it, e.g. [40.44.47 @ 1530]
            }
            var pianoKeyNotes = [];
            var pianoKeyStrings = noteGroupString.split('.');
            for (var _i = 0, pianoKeyStrings_1 = pianoKeyStrings; _i < pianoKeyStrings_1.length; _i++) {
                var s = pianoKeyStrings_1[_i];
                var n = parseInt(s);
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
    NoteGroup.prototype.addNote = function (n) {
        this.notes.push(n);
        var len = this.notes.length;
        if (len > 1) {
            this.notes.sort(Note.compare);
            // This "unique-ifying" algorithm only works because we sorted the array in the line above.
            var uniqueNotes = [this.notes[0]];
            for (var i = 1; i < len; i++) {
                var mostRecentlyAddedNote = uniqueNotes[uniqueNotes.length - 1];
                var note = this.notes[i];
                if (note.pianoNote !== mostRecentlyAddedNote.pianoNote) {
                    uniqueNotes.push(note);
                }
            }
            this.notes = uniqueNotes;
        }
    };
    NoteGroup.prototype.toString = function () {
        return "[" + this.notes.join('.') + " @ " + this.playTimeMillis + "]"; // V2 contains the playTime for each NoteGroup
    };
    NoteGroup.prototype.toStringV1 = function () {
        return this.notes.join('.'); // V1 does not contain the playTime
    };
    Object.defineProperty(NoteGroup.prototype, "numNotes", {
        get: function () {
            return this.notes.length;
        },
        enumerable: true,
        configurable: true
    });
    NoteGroup.prototype.copy = function () {
        return new NoteGroup(this.toString()); // clone this object.
    };
    NoteGroup.merge = function (n1, n2) {
        var merged = new NoteGroup();
        for (var _i = 0, _a = n1.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            merged.addNote(note);
        }
        for (var _b = 0, _c = n2.notes; _b < _c.length; _b++) {
            var note = _c[_b];
            merged.addNote(note);
        }
        return merged;
    };
    return NoteGroup;
}());
//////////////////////////////////////////////////////////////////////
var Note = (function () {
    function Note(pianoNote, durationInMillis, velocity) {
        if (durationInMillis === void 0) { durationInMillis = 1000; }
        if (velocity === void 0) { velocity = 127; }
        this.pianoNote = pianoNote;
        this.midiNote = pianoNote + 20;
        this.durationInMillis = durationInMillis;
        this.velocity = velocity;
    }
    Note.prototype.toString = function () {
        return this.pianoNote + '';
    };
    Note.compare = function (a, b) {
        return a.pianoNote - b.pianoNote; // sort from smallest number to highest number
    };
    return Note;
}());
//////////////////////////////////////////////////////////////////////
var keyCodeToPianoKey = {
    32: 11,
    90: 13,
    88: 15,
    //
    67: 16,
    86: 18,
    66: 20,
    78: 21,
    77: 23,
    188: 25,
    190: 27,
    //
    191: 28,
    65: 30,
    83: 32,
    68: 33,
    70: 35,
    71: 37,
    72: 39,
    //
    74: 40,
    75: 42,
    76: 44,
    186: 45,
    59: 45,
    222: 47,
    81: 47,
    87: 49,
    69: 51,
    //
    82: 52,
    84: 54,
    89: 56,
    85: 57,
    73: 59,
    79: 61,
    80: 63,
    //
    219: 64,
    221: 66,
    220: 68,
    192: 68,
    49: 69,
    50: 71,
    51: 73,
    52: 75,
    //
    53: 76,
    54: 78,
    55: 80,
    56: 81,
    57: 83,
    48: 85,
    189: 87,
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
    var html = '';
    for (var i = 0; i < numTracks; i++) {
        tracks.push([]); // Add one array for each track. Tracks contain NoteGroups.
        var checkbox = "<input id=\"track-" + i + "-checkbox\" type=\"checkbox\" checked class=\"checkbox\">";
        var info = "<div id=\"track-" + i + "-info\" class=\"track-info\"></div>";
        html += "" + checkbox + info + "<div id=\"track-" + i + "\" class=\"track\"></div><br>"; // Also add the corresponding DOM elements.
    }
    $('#tracks').html(html);
    for (var i = 0; i < numTracks; i++) {
        $tracks.push($("#track-" + i));
        $trackInfos.push($("#track-" + i + "-info"));
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
    var numTracks = tracks.length;
    for (var t = 0; t < numTracks; t++) {
        var trackHTML = '';
        var noteGroupID = '';
        var currTrack = tracks[t];
        var numNoteGroups = currTrack.length;
        for (var n = 0; n < numNoteGroups; n++) {
            var noteGroup = currTrack[n];
            var multiple = (noteGroup.numNotes > 1) ? ' multiple' : '';
            noteGroupID = "t_" + t + "_n_" + n; // t_0_n_0 stands for track 0 notegroup 0
            trackHTML += "<div id=\"" + noteGroupID + "\" class=\"notegroup" + multiple + "\">" + noteGroup.toStringV1() + "</div>&nbsp;";
        }
        $tracks[t].html(trackHTML);
        if (numNoteGroups > 0) {
            $trackInfos[t].html("" + numNoteGroups);
        }
        else {
            $trackInfos[t].html('');
        }
        // Scroll the divs all the way to the right to make sure the most recent NoteGroups are visible.
        var element = $("#" + noteGroupID)[0];
        if (element) {
            element.scrollIntoView();
        }
    }
}
function mergeLastTwoGroups() {
    if (tracks[0].length >= 2) {
        var merged = NoteGroup.merge(tracks[0].pop(), tracks[0].pop());
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
    var notes = lastGroup[0].notes;
    for (var _i = 0, notes_1 = notes; _i < notes_1.length; _i++) {
        var n = notes_1[_i];
        var remainder = n.pianoNote % 12;
        var octaveIndex = Math.floor((n.pianoNote - 1) / 12);
        c.beginPath();
        if (_.includes(blackKeys, remainder)) {
            var blackKeyIndex = (octaveIndex * 7) + blackKeys.indexOf(remainder);
            // black keys are 16px wide
            c.arc(blackKeyIndex * 20 + 20, 60, 6, 0, 2 * Math.PI, false);
        }
        else {
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
    var elem = document.getElementById('pianoCanvas');
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
            }
            else {
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
        var savedTracks = JSON.parse(localStorage.getItem('tracks'));
        var numTracks = savedTracks.length;
        setupTracks(numTracks);
        for (var i = 0; i < numTracks; i++) {
            var savedTrack = savedTracks[i];
            for (var _i = 0, savedTrack_1 = savedTrack; _i < savedTrack_1.length; _i++) {
                var noteGroupString = savedTrack_1[_i];
                tracks[i].push(new NoteGroup(noteGroupString));
            }
        }
    }
    catch (e) {
        setupTracks(1);
    }
}
function saveTracksToLocalStorage() {
    var tracksToSave = [];
    for (var _i = 0, tracks_1 = tracks; _i < tracks_1.length; _i++) {
        var sourceTrack = tracks_1[_i];
        var destTrack = [];
        tracksToSave.push(destTrack);
        for (var _a = 0, sourceTrack_1 = sourceTrack; _a < sourceTrack_1.length; _a++) {
            var noteGroup = sourceTrack_1[_a];
            destTrack.push(noteGroup.toString());
        }
    }
    localStorage.setItem('tracks', JSON.stringify(tracksToSave));
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
        localStorage.setItem('sharps', sharps);
    }
    else if ($flats.is(":focus")) {
        flats = $flats.val().toLowerCase();
        localStorage.setItem('flats', flats);
    }
}
function onKeyDownHandler(e) {
    if ($sharps.is(":focus") || $flats.is(":focus")) {
        return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
    }
    if (e.keyCode == 91 || e.keyCode == 93) {
    }
    if (e.metaKey) {
        if (e.keyCode == 88 || e.keyCode == 67) {
        }
        return;
    }
    if (e.altKey) {
        return;
    }
    var sharpModifier = 0;
    if (e.ctrlKey) {
        sharpModifier = -1;
    }
    else if (e.shiftKey) {
        sharpModifier = +1;
    }
    e.preventDefault();
    switch (e.keyCode) {
        case 33:
            console.log('fn + UP');
            break;
        case 34:
            console.log('fn + DOWN');
            break;
        case 36:
            console.log('fn + LEFT');
            break;
        case 35:
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
        case 27:
            if (e.shiftKey) {
                resetEverything();
            }
            else {
                resetOffset();
            }
            break;
        case 8:
            deleteLastGroup();
            break;
        case 9:
            mergeLastTwoGroups();
            break;
        case 38:
            octaveOffset++;
            if (octaveOffset > 2) {
                octaveOffset = 2;
            }
            drawPiano();
            break;
        case 40:
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
// Currently only supports a single track (Track 0).
// Returns a textual representation of the song (e.g., 40 42 44 45 40.47)
function getTextFileFromTracks() {
    // TODO: Round Robin through the tracks to find smallest play times (or if they're all undefined, just pick from the first track)
    // Then keep adding them to our array as strings....
    // fix this so that we can save multi tracks properly
    // load MIDI => save as TEXT file or save as MIDI
    // do the same for getMIDIFileFromTracks.... in that case, just replicate our tracks (any tracks that have NOTE_ON events)
    var numTracks = tracks.length;
    var noteGroupStrings = [];
    if (numTracks === 1) {
        var track = tracks[0];
        for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
            var noteGroup = track_1[_i];
            noteGroupStrings.push(noteGroup.toStringV1());
        }
    }
    else {
        // Round robin through all the tracks, looking for the next event to play.
        while (true) {
            var minPlayTime = Number.MAX_VALUE;
            var nextNoteGroup = null;
            var nextNoteGroupTrack = null; // Which track contains the next note group to play?
            // Loop through all the tracks to find the next NoteGroup to play.
            for (var t = 0; t < numTracks; t++) {
                var currTrack = tracks[t];
                if (currTrack.length === 0) {
                    continue;
                }
                else {
                    var noteGroup = currTrack[0];
                    if (noteGroup.playTimeMillis < minPlayTime) {
                        nextNoteGroup = noteGroup;
                        nextNoteGroupTrack = currTrack;
                    }
                }
            }
            // If did not find any NoteGroups, we're done!
            if (!nextNoteGroup) {
                break;
            }
            else {
                noteGroupStrings.push(nextNoteGroup.toString());
                nextNoteGroupTrack.shift(); // remove the first item.
            }
        }
    }
    // Melody lines start with two slashes.
    return '// ' + noteGroupStrings.join(' ');
}
// Use jsmidgen to create a MIDI file that we can encode in base 64.
// https://github.com/dingram/jsmidgen
function getMIDIFileFromTracks() {
    var file = new Midi.File();
    var track = new Midi.Track();
    track.setTempo(120); // BPM
    file.addTrack(track);
    var duration = 32; // 128 ticks == quarter note == 1 beat; 64 ticks == eighth note
    var timeSincePreviousEvent = 0; // 32 ticks == 1/4 beat gap between notes.
    var channel = 0;
    for (var _i = 0, _a = tracks[0]; _i < _a.length; _i++) {
        var noteGroup = _a[_i];
        noteGroup.notes.forEach(function (note, index) {
            if (index === 0) {
                track.noteOn(channel, note.midiNote, timeSincePreviousEvent, 127 /* velocity */);
            }
            else {
                // Since we are playing a chord, other notes of this NoteGroup start at the same time.
                // Thus, the timeSincePreviousEvent == 0
                track.noteOn(channel, note.midiNote, 0, 127 /* velocity */);
            }
        });
        noteGroup.notes.forEach(function (note, index) {
            if (index === 0) {
                // timeSincePreviousEvent == duration of the note.
                track.noteOff(channel, note.midiNote, duration);
            }
            else {
                // Since we are stopping the chord, other notes of this NoteGroup stop at the same time.
                // Thus, the timeSincePreviousEvent == 0
                track.noteOff(channel, note.midiNote, 0);
            }
        });
    }
    return file.toBytes();
}
function setupMouseHandlers() {
    Playback.setupButtons();
    // When we hover over the Download MIDI | TEXT links, we should update
    // the href attributes so that we download the correct data.
    $download_midi_link = $('#download_midi_link');
    $download_text_link = $('#download_text_link');
    $download_midi_link.mouseover(function () {
        // GENERATE THE MIDI FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        var midi = getMIDIFileFromTracks();
        var base64Text = btoa(midi); // base 64 encoding
        $download_midi_link.attr('href', 'data:audio/midi;base64,' + base64Text);
    });
    $download_text_link.mouseover(function () {
        // GENERATE THE TEXT FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        // Assume a single track for now.
        var text = getTextFileFromTracks();
        var base64Text = btoa(text); // base 64 encoding
        $download_text_link.attr('href', 'data:text/plain;base64,' + base64Text);
    });
}
function setupTracks(numTracks) {
    tracks = [];
    $tracks = [];
    $trackInfos = [];
    addTracks(numTracks);
}
function displayFileInfo(file) {
    $('#file-info').text("Loaded File: " + file.name + " | Size: " + file.size + " bytes");
}
function setupDragAndDrop() {
    var handlers = {
        onDrop: function (files, pos) {
            // console.log('Here are the dropped files', files)
            // console.log('Dropped at coordinates', pos.x, pos.y)
            readMIDIFile(files[0]); // Get the first file.
        },
        onDragOver: function () {
            $('#drag-and-drop-target').addClass('drag');
        },
        onDragLeave: function () {
            $('#drag-and-drop-target').removeClass('drag');
        }
    };
    DragDrop('html', handlers);
}
function setupFileChooser() {
    $('#filechooser').change(function (e) {
        var files = e.target.files;
        if (files.length > 0) {
            readMIDIFile(files[0]); // Get the first file.
        }
    });
}
function readMIDIFile(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
        var arrayBuffer = e.target.result;
        displayFileInfo(file);
        loadMIDIFile(arrayBuffer);
    });
    reader.addEventListener('error', function (err) {
        console.error('FileReader error' + err);
    });
    reader.readAsArrayBuffer(file);
}
function loadMIDIFile(arrayBuffer) {
    Playback.stop();
    midiFile = new MIDIFile(arrayBuffer);
    var header = midiFile.header;
    var format = header.getFormat();
    var numTracks = header.getTracksCount();
    console.log("MIDI Format: " + format); // 0, 1 or 2
    if (header.getTimeDivision() === MIDIFile.Header.TICKS_PER_BEAT) {
        console.log("Ticks Per Beat: " + header.getTicksPerBeat());
    }
    else {
        console.log('TODO: SMPTE Frames!');
    }
    loadMIDITracks();
    console.log();
    var lyrics = midiFile.getLyrics();
    if (lyrics.length > 0) {
        console.log("Lyrics Track " + lyrics.length + " events.");
    }
    var events = midiFile.getEvents();
    var lastEvent = events[events.length - 1];
    var durationInMillis = lastEvent.playTime;
    var durationInSeconds = durationInMillis / 1000;
    console.log("Duration: " + durationInSeconds + " seconds.");
    displaySongInfo({
        numTracks: numTracks,
        duration: durationInSeconds
    });
}
function loadMIDITracks() {
    setupTracks(midiFile.tracks.length);
    var noteGroups = getNoteGroupsFromMIDIFile();
    for (var _i = 0, noteGroups_1 = noteGroups; _i < noteGroups_1.length; _i++) {
        var noteGroup = noteGroups_1[_i];
        var trackNumber = noteGroup.midiTrackNumber;
        tracks[trackNumber].push(noteGroup.copy());
        console.log("Track " + trackNumber + " Play " + noteGroup.toString());
    }
    saveAndShowData();
}
function displaySongInfo(params) {
    var duration = Math.round(params.duration * 100) / 100;
    $('#song-info').text("Num Tracks: " + params.numTracks + " | Duration: " + duration + " secs");
}
function playMIDINote(midiNoteNum, velocity) {
    if (velocity === void 0) { velocity = 127.0; }
    pianoInstrument.tone({
        pitch: -midiNoteNum,
        duration: 1.0,
        velocity: (velocity / 127.0)
    });
}
var MIDI;
(function (MIDI) {
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
            case MIDIEvents.EVENT_META_SEQUENCE_NUMBER:
                return 'META_SEQUENCE_NUMBER';
            case MIDIEvents.EVENT_META_TEXT:
                return 'META_TEXT';
            case MIDIEvents.EVENT_META_COPYRIGHT_NOTICE:
                return 'META_COPYRIGHT_NOTICE';
            case MIDIEvents.EVENT_META_TRACK_NAME:
                return 'META_TRACK_NAME';
            case MIDIEvents.EVENT_META_INSTRUMENT_NAME:
                return 'META_INSTRUMENT_NAME';
            case MIDIEvents.EVENT_META_LYRICS:
                return 'META_LYRICS';
            case MIDIEvents.EVENT_META_MARKER:
                return 'META_MARKER';
            case MIDIEvents.EVENT_META_CUE_POINT:
                return 'CUE_POINT';
            case MIDIEvents.EVENT_META_MIDI_CHANNEL_PREFIX:
                return 'META_MIDI_CHANNEL_PREFIX';
            case MIDIEvents.EVENT_META_END_OF_TRACK:
                return 'META_END_OF_TRACK';
            case MIDIEvents.EVENT_META_SET_TEMPO:
                return 'META_SET_TEMPO';
            case MIDIEvents.EVENT_META_SMTPE_OFFSET:
                return 'META_SMTPE_OFFSET';
            case MIDIEvents.EVENT_META_TIME_SIGNATURE:
                return 'META_TIME_SIGNATURE';
            case MIDIEvents.EVENT_META_KEY_SIGNATURE:
                return 'META_KEY_SIGNATURE';
            case MIDIEvents.EVENT_META_SEQUENCER_SPECIFIC:
                return 'META_SEQUENCER_SPECIFIC';
            case MIDIEvents.EVENT_MIDI_NOTE_OFF:
                return 'MIDI_NOTE_OFF';
            case MIDIEvents.EVENT_MIDI_NOTE_ON:
                return 'MIDI_NOTE_ON';
            case MIDIEvents.EVENT_MIDI_NOTE_AFTERTOUCH:
                return 'MIDI_NOTE_AFTERTOUCH';
            case MIDIEvents.EVENT_MIDI_CONTROLLER:
                return 'MIDI_CONTROLLER';
            case MIDIEvents.EVENT_MIDI_PROGRAM_CHANGE:
                return 'MIDI_PROGRAM_CHANGE';
            case MIDIEvents.EVENT_MIDI_CHANNEL_AFTERTOUCH:
                return 'MIDI_CHANNEL_AFTERTOUCH';
            case MIDIEvents.EVENT_MIDI_PITCH_BEND:
                return 'MIDI_PITCH_BEND';
            default:
                return 'UNKNOWN';
        }
    }
})(MIDI || (MIDI = {}));
///////////////////////////////////////////////////////////////////////////
var Playback;
(function (Playback) {
    // All times are in milliseconds.
    var currSongTime = 0; // What time is our playhead pointing to?
    var baseSongTime = 0; // What time did our playhead point to when we started or resumed the song?
    var rafStartTime = 0;
    var rafID = 0; // Keep a handle on the requestAnimationFrame ID so that we can stop it when the user presses PAUSE or STOP.
    var noteGroupsToPlay = [];
    var isPaused = false;
    // jQuery references to the DOM
    var $playButton = null;
    var $pauseButton = null;
    var $stopButton = null;
    var nextEventPlayTime = 0;
    function isPlaying() {
        return rafID !== 0;
    }
    Playback.isPlaying = isPlaying;
    // starts or resumes playback
    function start() {
        if (isPaused) {
            baseSongTime = currSongTime;
        }
        else {
            // Start the MIDI playback.
            // TODO: Only play back the tracks that are checked!
            if (midiFile) {
                console.log('Start Playing the MIDI File!');
                noteGroupsToPlay = getNoteGroupsFromMIDIFile();
            }
            else {
                console.log('Start Playing the Tracks directly!');
                noteGroupsToPlay = getNoteGroupsFromTracks();
            }
            if (noteGroupsToPlay.length === 0) {
                console.log('No more NoteGroups to play!');
                Playback.stop();
                return; // DONE!
            }
            currSongTime = 0;
            baseSongTime = 0;
            determinePlayTimeForNextEvent();
        }
        // Call RAF once to set the start time.
        rafID = requestAnimationFrame(function (rafCurrTime) {
            rafStartTime = rafCurrTime;
            // After the start time is set, we can begin playing the events!
            rafID = requestAnimationFrame(playNextEvents);
        });
        isPaused = false;
    }
    Playback.start = start;
    function pause() {
        stop();
        isPaused = true; // Next time, continue from where we left off.
    }
    Playback.pause = pause;
    function stop() {
        if (isPlaying()) {
            cancelAnimationFrame(rafID);
            rafID = 0;
        }
        noteGroupsToPlay = [];
    }
    Playback.stop = stop;
    // Will be called every ~16.67ms if your display runs at 60 FPS.
    function playNextEvents(rafCurrTime) {
        // Have we reached the end of the song?
        if (noteGroupsToPlay.length === 0) {
            Playback.stop();
            return; // DONE!
        }
        currSongTime = rafCurrTime - rafStartTime + baseSongTime;
        while (currSongTime >= nextEventPlayTime) {
            var event_1 = noteGroupsToPlay.shift();
            for (var _i = 0, _a = event_1.notes; _i < _a.length; _i++) {
                var note = _a[_i];
                playMIDINote(note.midiNote, note.velocity);
            }
            // Have we reached the end of the song?
            if (noteGroupsToPlay.length === 0) {
                Playback.stop();
                return; // DONE!
            }
            else {
                determinePlayTimeForNextEvent();
            }
        }
        rafID = requestAnimationFrame(playNextEvents);
    }
    function determinePlayTimeForNextEvent() {
        nextEventPlayTime = noteGroupsToPlay[0].playTimeMillis;
        if (typeof nextEventPlayTime === 'undefined') {
            nextEventPlayTime = currSongTime + TIME_BETWEEN_NOTEGROUPS; // If the playTime isn't specified, we play the next note every half second!
        }
    }
    function setupButtons() {
        $playButton = $('#play-button');
        $playButton.click(start);
        $pauseButton = $('#pause-button');
        $pauseButton.click(pause);
        $stopButton = $('#stop-button');
        $stopButton.click(stop);
    }
    Playback.setupButtons = setupButtons;
})(Playback || (Playback = {}));
// Convert from MIDI events to NoteGroups
function getNoteGroupsFromMIDIFile() {
    // Only handle NOTE_ON events for now.
    var noteOnEvents = midiFile.getEvents(MIDIEvents.EVENT_MIDI, MIDIEvents.EVENT_MIDI_NOTE_ON);
    var noteGroups = [];
    // Remember the most recently processed event so that we can merge notes that are played at the same time and on the same track.
    var lastNoteGroup = null;
    var lastPlayTime = -1;
    var lastTrackNumber = -1;
    for (var _i = 0, noteOnEvents_1 = noteOnEvents; _i < noteOnEvents_1.length; _i++) {
        var event_2 = noteOnEvents_1[_i];
        // let type = event.type;
        // let subtype = event.subtype;
        // let status = (event.subtype << 4) + event.channel;
        // let statusCodeHexString = '0x' + status.toString(16).toUpperCase();
        var trackNumber = event_2.track;
        var playTime = event_2.playTime; // time in milliseconds
        var midiNoteNum = event_2.param1;
        var velocity = event_2.param2;
        var pianoNoteNum = m2p(midiNoteNum);
        var noteToPlay = new Note(pianoNoteNum, 1.0 /* duration */, velocity);
        console.log("Track " + trackNumber + " Play " + noteToPlay + " @ " + playTime);
        // TODO: handle time delta thresholds! playTime <= lastPlayTime + threshold
        if (playTime === lastPlayTime &&
            trackNumber === lastTrackNumber) {
            // Merge all notes starting at the same time and on the same track into a single NoteGroup.
            lastNoteGroup.addNote(noteToPlay);
        }
        else {
            var noteGroup = new NoteGroup(noteToPlay, playTime);
            noteGroup.midiTrackNumber = trackNumber;
            noteGroups.push(noteGroup);
            lastNoteGroup = noteGroup;
            lastTrackNumber = trackNumber;
            lastPlayTime = playTime;
        }
    }
    return noteGroups;
}
function getNoteGroupsFromTracks() {
    var noteGroups = [];
    var currTime = 0;
    var deltaTime = 500; // milliseconds
    // TODO: Examine the tracks for the minimum playTime. Round robin between the tracks until we insert all the notegroups properly...
    for (var _i = 0, tracks_2 = tracks; _i < tracks_2.length; _i++) {
        var track = tracks_2[_i];
        for (var _a = 0, track_2 = track; _a < track_2.length; _a++) {
            var noteGroup = track_2[_a];
            var noteGroupCopy = noteGroup.copy();
            noteGroupCopy.playTimeMillis = currTime;
            noteGroups.push(noteGroupCopy);
            currTime += deltaTime;
        }
    }
    return noteGroups;
}
function setupUI() {
    $sharps = $("#sharps_textarea");
    $flats = $("#flats_textarea");
    loadTracksFromLocalStorage();
    loadSharpsAndFlats();
    showNoteGroupsForTracks();
    setupKeyHandlers();
    setupMouseHandlers();
    setupDragAndDrop();
    setupFileChooser();
    drawPiano();
}
$(function () {
    setupUI();
});
//# sourceMappingURL=piano2.js.map