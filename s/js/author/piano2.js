'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/////////////////////////////////////////////////////////////////////////////////
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
    '_', 'z', 'x',
    'c', 'v', 'b', 'n', 'm', ',', '.',
    '/', 'a', 's', 'd', 'f', 'g', 'h',
    'j', 'k', 'l', ';', 'q', 'w', 'e',
    'r', 't', 'y', 'u', 'i', 'o', 'p',
    '[', ']', '\\', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '0', '-',
    '=' // C
];
// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
function p2m(pianoNote) {
    return pianoNote + 20;
}
function m2p(midiNote) {
    return midiNote - 20;
}
var piano = new Instrument('piano');
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
    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    function NoteGroup(a) {
        if (typeof a === 'string') {
            var pianoKeyNotes = [];
            var pianoKeyStrings = a.split('.');
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
        return this.notes.join('.');
    };
    Object.defineProperty(NoteGroup.prototype, "numNotes", {
        get: function () {
            return this.notes.length;
        },
        enumerable: true,
        configurable: true
    });
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
            trackHTML += "<div id=\"" + noteGroupID + "\" class=\"notegroup" + multiple + "\">" + noteGroup + "</div>&nbsp;";
        }
        $tracks[t].html(trackHTML);
        $trackInfos[t].html("" + numNoteGroups);
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
        if (_.contains(blackKeys, remainder)) {
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
        if (_.contains(whiteKeys, remainder)) {
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
            pitch: -p2m(pianoKeyNumber),
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
            drawPiano();
            break;
        case 40:
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
function getTextFileFromTracks() {
    var noteGroupStrings = [];
    for (var _i = 0, _a = tracks[0]; _i < _a.length; _i++) {
        var noteGroup = _a[_i];
        noteGroupStrings.push(noteGroup.toString());
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
    stopCurrentPlayback();
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
    loadMIDITracks(midiFile, midiFile.tracks);
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
    // xxx
    // Start the MIDI playback.
    // currentRAFID = requestAnimationFrame(setupPlayback);
}
function loadMIDITracks(midiFile, midiTracks) {
    var numTracks = midiTracks.length;
    setupTracks(numTracks);
    for (var t = 0; t < numTracks; t++) {
        var track = midiTracks[t];
        var trackEvents = midiFile.getTrackEvents(t);
        console.log("Track " + t + " has " + trackEvents.length + " events.");
        var numOtherMidiEvents = 0;
        var numOtherEvents = 0;
        for (var _i = 0, trackEvents_1 = trackEvents; _i < trackEvents_1.length; _i++) {
            var event_1 = trackEvents_1[_i];
            var type = event_1.type;
            var subtype = event_1.subtype;
            var status_1 = (event_1.subtype << 4) + event_1.channel;
            var statusCodeHexString = '0x' + status_1.toString(16).toUpperCase();
            var data1 = event_1.param1;
            var data2 = event_1.param2;
            var time = event_1.playTime; // time in milliseconds
            if (type === MIDIEvents.EVENT_MIDI) {
                if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                    var midiNoteNum = data1;
                    var pianoNoteNum = m2p(data1);
                    var velocity = data2;
                    // Only handle NOTE_ON events for now.
                    // TODO: figure out which notes start at the same time (or are within some time threshold)
                    tracks[t].push(new NoteGroup(new Note(pianoNoteNum)));
                    console.log("Track " + t + " Note ON");
                }
                else if (subtype === MIDIEvents.EVENT_MIDI_NOTE_OFF) {
                    console.log("Track " + t + " Note OFF");
                }
                else {
                    console.log("Track " + t + " " + getTypeString(type) + "." + getSubTypeString(subtype));
                    numOtherMidiEvents++;
                }
            }
            else {
                console.log("Track " + t + " " + getTypeString(type) + "." + getSubTypeString(subtype));
                numOtherEvents++;
            }
        }
        console.log("Track " + t + " has " + numOtherMidiEvents + " other MIDI events and " + numOtherEvents + " other events.");
    }
    saveAndShowData();
}
function displaySongInfo(params) {
    var duration = Math.round(params.duration * 100) / 100;
    $('#song-info').text("Num Tracks: " + params.numTracks + " | Duration: " + duration + " secs");
}
var midiFile = null;
var startTime = 0;
var eventsToReplay = null;
var currentRAFID = 0;
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
    var currTime = timeMillis - startTime;
    while (currTime >= eventsToReplay[0].playTime) {
        var event_2 = eventsToReplay.shift();
        var type = event_2.type;
        var subtype = event_2.subtype;
        var status_2 = (event_2.subtype << 4) + event_2.channel;
        var statusCodeHexString = '0x' + status_2.toString(16).toUpperCase();
        var data1 = event_2.param1;
        var data2 = event_2.param2;
        var time = event_2.playTime; // time in milliseconds
        // console.log(`Type: ${getTypeString(type)} Subtype: ${getSubTypeString(subtype)} Status: ${statusCodeHexString}, Data_1: ${data1}, Data_2: ${data2}, Event Time: ${time}, Curr Time: ${currTime}`);
        if (type === MIDIEvents.EVENT_MIDI) {
            if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                playMIDINote(data1, data2);
            }
            else if (subtype === MIDIEvents.EVENT_MIDI_NOTE_OFF) {
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
        pitch: -midiNoteNum,
        duration: 2.0,
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
var Colors = {
    setup: function () {
        this.colors = [];
        this.numColors = 20;
        for (var i = 0; i < this.numColors; i++) {
            this.colors.push(this.getRainbow(this.numColors, i));
        }
    },
    getRandom: function () {
        return this.colors[Math.floor(Math.random() * this.numColors)];
    },
    getRainbow: function (numOfSteps, step) {
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6); // ~~ => Math.floor
        var f = h * 6 - i;
        var q = 1 - f;
        var max = 0.8;
        var min = 0.1;
        switch (i % 6) {
            case 0:
                r = max;
                g = f;
                b = min;
                break;
            case 1:
                r = q;
                g = max;
                b = min;
                break;
            case 2:
                r = min;
                g = max;
                b = f;
                break;
            case 3:
                r = min;
                g = q;
                b = max;
                break;
            case 4:
                r = f;
                g = min;
                b = max;
                break;
            case 5:
                r = max;
                g = min;
                b = q;
                break;
        }
        var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
        return (c);
    }
};
$(function () {
    Colors.setup();
    setupUI();
    setupMIDIFileSupport();
});
//# sourceMappingURL=piano2.js.map