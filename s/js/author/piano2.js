'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/////////////////////////////////////////////////////////////////////////////////
var TIME_BETWEEN_NOTEGROUPS = 250;
var TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES = 0; // Adjust this for parsing MIDI recordings of piano performances (i.e., imprecise timing).
var WHITE_KEY_WIDTH = 20;
// Support multi track MIDI songs.
// When we compose by hand, stick everything in track 0.
var tracks = [];
var $tracks = []; // jQuery references to the elements. Allows us to modify the DOM.
var $trackInfos = []; // jQuery references to the elements. Allows us to modify the DOM.
var $currentStatus = null;
var $sharps, $flats;
var sharps = ""; // the string value of the $sharps input
var flats = "";
var octaveOffset = 0;
var checkboxStatus = [];
// jQuery references to the DOM
var $download_midi_link = null;
var $download_text_link = null;
var $playButton = null;
var $pauseButton = null;
var $stopButton = null;
// canvas 2d
var pianoContext2d = null;
var pianoContext2dWidth = 0;
var pianoContext2dHeight = 0;
// piano key numbers % 12
var blackKeys = [2, -1, 5, 7, -1, 10, 0]; // -1 is for the spaces where there are no black keys
var whiteKeys = [1, 3, 4, 6, 8, 9, 11];
var noteLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
var sharpOrFlatModifier = 0;
var pianoInstrument = new Instrument('piano'); // musical.js
// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
function p2m(pianoNote) {
    return pianoNote + 20;
}
function m2p(midiNote) {
    return midiNote - 20;
}
var Keyboard;
(function (Keyboard) {
    // which character to type to get the corresponding white key
    Keyboard.labels = [
        '␣', 'z', 'x',
        'c', 'v', 'b', 'n', 'm', ',', '.',
        '/', 'a', 's', 'd', 'f', 'g', 'h',
        'j', 'k', 'l', ';', 'q', 'w', 'e',
        'r', 't', 'y', 'u', 'i', 'o', 'p',
        '[', ']', '\\', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '0', '-',
        '=' // C
    ];
    Keyboard.keyCodeToPianoKeyNumber = {
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
})(Keyboard || (Keyboard = {}));
// A Track is just an Array of NoteGroups
var Track = (function (_super) {
    __extends(Track, _super);
    function Track() {
        _super.apply(this, arguments);
        // NOTHING YET
        this.trackNumber = -1;
    }
    return Track;
}(Array));
//////////////////////////////////////////////////////////////////////
var NoteGroup = (function () {
    // NoteGroup looks like: 40.44.47 or [40.44.47 @ 1530]
    // The number after the @ indicates the playback time of the NoteGroup, in milliseconds.
    // Parameter "a"" can be either a single Note or a string which indicates multiple notes.
    // The string is formatted as multiple piano key numbers separated by a period (e.g., "40.52").
    function NoteGroup(a, playTimeMillis, trackIndex) {
        if (playTimeMillis === void 0) { playTimeMillis = -1; }
        if (trackIndex === void 0) { trackIndex = 0; }
        this.playTimeMillis = -1;
        this.trackIndex = 0; // Which MIDI track was this NoteGroup extracted from?
        this.noteIndex = -1; // What is the index of the MIDI note?
        this.playTimeMillis = playTimeMillis;
        this.trackIndex = trackIndex;
        if (typeof a === 'string') {
            var noteGroupString = a;
            if (noteGroupString.indexOf('[') !== -1) {
                var pattern = /\[\s*(.+)\s*\@\s*(.+)\s*\]/;
                var match = pattern.exec(noteGroupString);
                noteGroupString = match[1]; // e.g., 40.44.47
                var timeString = match[2]; // e.g., 1530
                this.playTimeMillis = parseFloat(timeString); // The playTimeMillis was specified, e.g. [40.44.47 @ 1530]
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
    // V2
    NoteGroup.prototype.toString = function () {
        if (this.playTimeMillis === -1) {
            return this.notes.join('.'); // Use the simple format when playTimeMillis is not specified (i.e. -1).
        }
        else {
            return "[" + this.notes.join('.') + " @ " + this.playTimeMillis + "]"; // V2 contains the playTime for each NoteGroup
        }
    };
    Object.defineProperty(NoteGroup.prototype, "numNotes", {
        // V1 of our Tiny Piano Song format does not contain the playTime
        // toString(): string {
        //     return this.notes.join('.');
        // }
        get: function () {
            return this.notes.length;
        },
        enumerable: true,
        configurable: true
    });
    NoteGroup.prototype.copy = function () {
        var clone = new NoteGroup(this.toString());
        clone.playTimeMillis = this.playTimeMillis;
        clone.trackIndex = this.trackIndex;
        clone.noteIndex = this.noteIndex;
        return clone;
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
    Playback.stop();
    $('#file-info').html('&nbsp;');
    $('#song-info').html('&nbsp;');
}
function addTracks(numTracks) {
    var html = '';
    for (var t = 0; t < numTracks; t++) {
        var trackObj = new Track();
        trackObj.trackNumber = t;
        tracks.push(trackObj); // Add one array for each track. Tracks contain NoteGroups.
        var checkbox = "<input id=\"track-" + t + "-checkbox\" type=\"checkbox\" class=\"checkbox\">";
        var info = "<div id=\"track-" + t + "-info\" class=\"track-info\"></div>";
        var track = "<div id=\"track-" + t + "\" class=\"track\">";
        html += "<div id=\"track-" + t + "-container\" class=\"track-container\">" + checkbox + info + track + "</div></div>"; // Also add the corresponding DOM elements.
    }
    $('#tracks').html(html);
    var _loop_1 = function(t) {
        var checkbox = $("#track-" + t + "-checkbox");
        checkbox.prop('checked', true);
        checkbox.change(function () {
            checkboxStatus[t] = this.checked;
            LocalStorage.saveCheckBoxes();
        });
        $tracks.push($("#track-" + t));
        $trackInfos.push($("#track-" + t + "-info"));
    };
    for (var t = 0; t < numTracks; t++) {
        _loop_1(t);
    }
}
function saveAndShowData() {
    LocalStorage.saveTracks();
    showNoteGroupsForTracks();
    drawPiano();
}
function getNoteGroupID(trackNum, noteGroupNum) {
    return "t" + trackNum + "_n" + noteGroupNum;
}
// TODO: When manually editing, only append and modify the last couple of spans. Don't regenerate the entire thing, for performance!
function showNoteGroupsForTracks() {
    var numTracks = tracks.length;
    for (var t = 0; t < numTracks; t++) {
        var trackHTML = '';
        var currTrack = tracks[t];
        var numNoteGroups = currTrack.length;
        var n = 0;
        for (; n < numNoteGroups; n++) {
            var noteGroup = currTrack[n];
            var multiple = (noteGroup.numNotes > 1) ? ' multiple' : '';
            var noteGroupID = getNoteGroupID(t, n); // t_0_n_0 stands for track 0 notegroup 0
            trackHTML += "<div id=\"" + noteGroupID + "\" class=\"notegroup" + multiple + "\">" + noteGroup.toString() + "</div>";
        }
        $tracks[t].html(trackHTML);
        if (numNoteGroups > 0) {
            $trackInfos[t].html("" + numNoteGroups);
            $("#track-" + t + "-checkbox").prop('checked', (checkboxStatus[t] !== false)); // Explicitly check for !== false. If the status is true or null or undefined, we leave it checked.
            $("#track-" + t + "-container").removeClass('empty');
        }
        else {
            $trackInfos[t].html('');
            $("#track-" + t + "-checkbox").prop('checked', false); // no reason to check an empty track
            $("#track-" + t + "-container").addClass('empty');
        }
        scrollNoteGroupIntoView(t, n); // n is set to the last noteGroup
    }
    Highlight.update();
}
function scrollNoteGroupIntoView(trackNum, noteGroupNum) {
    var noteGroupID = getNoteGroupID(trackNum, noteGroupNum);
    // Scroll the divs all the way to the right to make sure the most recent NoteGroups are visible.
    var element = document.querySelector("#" + noteGroupID);
    if (element) {
        element.scrollIntoView();
    }
}
function mergeLastTwoGroups() {
    var t = Highlight.activeTrack();
    var currTrack = tracks[t];
    if (currTrack.length >= 2) {
        var merged = NoteGroup.merge(currTrack.pop(), currTrack.pop());
        currTrack.push(merged);
        saveAndShowData();
    }
}
function deleteLastGroup() {
    var t = Highlight.activeTrack();
    tracks[t].pop();
    saveAndShowData();
}
function drawWhiteKeys(c) {
    c.strokeStyle = '#000';
    c.lineWidth = .2;
    c.fillStyle = '#FFF';
    for (var k = 0; k < 52; k++) {
        c.fillRect(k * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, 120);
        c.strokeRect(k * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, 120);
    }
    // Highlight Middle C in faint red.
    c.fillStyle = '#FCC';
    c.fillRect(23 * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, 120);
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
    var c = pianoContext2d;
    // clear the background
    c.fillStyle = "#444";
    c.fillRect(0, 0, pianoContext2dWidth, pianoContext2dHeight);
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
    var len = Keyboard.labels.length;
    for (var i = 0; i < len; i++) {
        c.fillText(Keyboard.labels[i], (i + offset) * 20 + 10, 140);
    }
}
var LocalStorage;
(function (LocalStorage) {
    function load() {
        loadTracks();
        loadSharpsAndFlats();
        loadCheckboxes();
    }
    LocalStorage.load = load;
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
            var savedTracks = JSON.parse(localStorage.getItem('tracks')); // can throw a SyntaxError
            var numTracks = savedTracks.length;
            setupTracks(numTracks);
            for (var t = 0; t < numTracks; t++) {
                var savedTrack = savedTracks[t];
                for (var _i = 0, savedTrack_1 = savedTrack; _i < savedTrack_1.length; _i++) {
                    var noteGroupString = savedTrack_1[_i];
                    var ng = new NoteGroup(noteGroupString);
                    ng.trackIndex = t;
                    tracks[t].push(ng);
                }
            }
        }
        catch (e) {
            setupTracks(1);
        }
    }
    function loadCheckboxes() {
        try {
            var savedCheckboxStatus = JSON.parse(localStorage.getItem('checkboxes')); // can throw a SyntaxError
            if (Array.isArray(savedCheckboxStatus) &&
                (savedCheckboxStatus.length === tracks.length)) {
                checkboxStatus = savedCheckboxStatus;
            }
            else {
                throw 'OOPS';
            }
        }
        catch (e) {
            checkboxStatus = [];
            localStorage.setItem('checkboxes', JSON.stringify([]));
        }
    }
    function saveCheckBoxes() {
        localStorage.setItem('checkboxes', JSON.stringify(checkboxStatus));
    }
    LocalStorage.saveCheckBoxes = saveCheckBoxes;
    function saveTracks() {
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
    LocalStorage.saveTracks = saveTracks;
    function saveSharpsAndFlats() {
        localStorage.setItem('sharps', sharps);
        localStorage.setItem('flats', flats);
    }
    LocalStorage.saveSharpsAndFlats = saveSharpsAndFlats;
})(LocalStorage || (LocalStorage = {}));
function play(basePianoKey) {
    // get the name of the note we are about to play
    var remainder = basePianoKey % 12;
    var whiteKeyNoteIndex = whiteKeys.indexOf(remainder);
    var noteLabel = noteLabels[whiteKeyNoteIndex];
    var modifier = sharpOrFlatModifier;
    // is this note auto-sharped, due to the key signature?
    if (sharps.indexOf(noteLabel) != -1) {
        modifier++; // raise the sharp a half-step!
    }
    // is this note auto-flatted, due to the key signature?
    if (flats.indexOf(noteLabel) != -1) {
        modifier--; // lower the note a half-step!
    }
    var pianoKeyNumber = basePianoKey + modifier + (octaveOffset * 12);
    if (pianoKeyNumber < 1 || pianoKeyNumber > 88) {
        return;
    }
    tracks[0].push(new NoteGroup(new Note(pianoKeyNumber)));
    playMIDINote(p2m(pianoKeyNumber));
    saveAndShowData();
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
    }
    else if ($flats.is(":focus")) {
        flats = $flats.val().toLowerCase();
        LocalStorage.saveSharpsAndFlats();
    }
    else {
        // Released CTRL or ALT
        if (e.ctrlKey) {
            sharpOrFlatModifier = 0;
        }
        else if (e.altKey) {
            sharpOrFlatModifier = 0;
        }
    }
}
function onKeyDownHandler(e) {
    if ($sharps.is(":focus") || $flats.is(":focus")) {
        return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
    }
    var keyCode = e.keyCode;
    // e.metaKey => CMD (91 is LEFT CMD & 93 is RIGHT COMD)
    if (e.metaKey) {
        if (keyCode == 37 || keyCode == 39) {
        }
        else {
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
        case 13:
            Playback.togglePlayPause();
            break;
        case 33:
            console.log('fn + UP');
            // Up an octave.
            octaveOffset++;
            if (octaveOffset > 2) {
                octaveOffset = 2;
            }
            drawPiano();
            break;
        case 34:
            console.log('fn + DOWN');
            // Down an octave.
            octaveOffset--;
            if (octaveOffset < -2) {
                octaveOffset = -2;
            }
            drawPiano();
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
            Highlight.prevTrack();
            break;
        case 40:
            Highlight.nextTrack();
            break;
        case 37:
            if (e.metaKey) {
                Highlight.firstNoteGroup();
            }
            else {
                Highlight.prevNoteGroup();
            }
            break;
        case 39:
            if (e.metaKey) {
                Highlight.lastNoteGroup();
            }
            else {
                Highlight.nextNoteGroup();
            }
            break;
        default:
            if (Keyboard.keyCodeToPianoKeyNumber.hasOwnProperty(keyCode)) {
                play(Keyboard.keyCodeToPianoKeyNumber[keyCode]);
            }
            break;
    }
}
var TEXT;
(function (TEXT) {
    // Returns a textual representation of the song
    // V1 => e.g., 40 42 44 45 40.47
    // V2 => e.g., [24.36 @ 0] [17.29 @ 2730] [36 @ 2904] [41 @ 3029] [44 @ 3152]
    function getFileFromTracks() {
        var numTracks = tracks.length;
        if (numTracks === 1) {
            var noteGroupStrings = [];
            var track = tracks[0];
            for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
                var noteGroup = track_1[_i];
                noteGroupStrings.push(noteGroup.toString());
            }
            // Melody lines start with two slashes.
            return '// ' + noteGroupStrings.join(' ');
        }
        else {
            var noteGroups = getNoteGroupsFromTracks();
            // Melody lines start with two slashes.
            return '// ' + noteGroups.join(' ');
        }
    }
    TEXT.getFileFromTracks = getFileFromTracks;
})(TEXT || (TEXT = {}));
function setupMouseHandlers() {
    Playback.setupButtons();
    // When we hover over the Download MIDI | TEXT links, we update
    // the href attributes so that we download the correct data.
    $download_midi_link.mouseover(function () {
        // GENERATE THE MIDI FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        var midi = MIDI.getFileFromTracks();
        var base64Text = btoa(midi); // base 64 encoding
        $download_midi_link.attr('href', 'data:audio/midi;base64,' + base64Text);
    });
    $download_text_link.mouseover(function () {
        // GENERATE THE TEXT FILE FROM OUR TRACKS. BASE 64 ENCODE IT.
        // Assume a single track for now.
        var text = TEXT.getFileFromTracks();
        var base64Text = btoa(text); // base 64 encoding
        $download_text_link.attr('href', 'data:text/plain;base64,' + base64Text);
    });
}
function setupTracks(numTracks) {
    tracks = [];
    $tracks = [];
    $trackInfos = [];
    addTracks(numTracks);
    Highlight.setupIndexes();
}
function displayFileInfo(file) {
    $('#file-info').text("Loaded File: " + file.name + " | Size: " + file.size + " bytes");
}
function setupDragAndDrop() {
    var handlers = {
        onDrop: function (files, pos) {
            // console.log('Here are the dropped files', files)
            // console.log('Dropped at coordinates', pos.x, pos.y)
            MIDI.readFile(files[0]); // Get the first file.
        },
        onDragOver: function () {
            $('#bottom-panel').addClass('drag');
        },
        onDragLeave: function () {
            $('#bottom-panel').removeClass('drag');
        }
    };
    DragDrop('html', handlers);
}
function setupFileChooser() {
    var $fileChooser = $('#filechooser');
    $fileChooser.change(function (e) {
        var files = e.target.files;
        console.log(files);
        if (files.length > 0) {
            MIDI.readFile(files[0]); // Get the first file.
        }
    });
    $('#filechooserlabel').mousedown(function (e) {
        console.log('nullify');
        $fileChooser[0].value = null;
    });
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
/////////////////////////////////////////////////////////////////////////////////
// Allow us to highlight a current track or current note group.
var Highlight;
(function (Highlight) {
    var currentTrackIndex = 0;
    var currentNoteGroupIndexForTrackIndex = [];
    var highlightedTrack = null;
    var highlightedTrackInfo = null;
    var highlightedNoteGroup = null;
    var h = 'highlight';
    function setupIndexes() {
        currentTrackIndex = 0;
        currentNoteGroupIndexForTrackIndex = [];
        var numTracks = tracks.length;
        for (var t = 0; t < numTracks; t++) {
            currentNoteGroupIndexForTrackIndex.push(0);
        }
    }
    Highlight.setupIndexes = setupIndexes;
    // Updates the visual indicators for our current track and current notegroup.
    function update() {
        var numTracks = $tracks.length;
        // assume the currentTrack & currentNoteGroup numbers are valid.
        // unhighlight the currently highlighted tracks.
        if (highlightedTrack) {
            highlightedTrack.removeClass(h);
        }
        if (highlightedTrackInfo) {
            highlightedTrackInfo.removeClass(h);
        }
        if (highlightedNoteGroup) {
            highlightedNoteGroup.removeClass(h);
        }
        highlightedTrack = $tracks[currentTrackIndex].addClass(h);
        highlightedTrackInfo = $trackInfos[currentTrackIndex].addClass(h);
        highlightedNoteGroup = $('#' + getNoteGroupID(currentTrackIndex, currentNoteGroupIndexForTrackIndex[currentTrackIndex])).addClass(h);
    }
    Highlight.update = update;
    function activeTrack() {
        return currentTrackIndex;
    }
    Highlight.activeTrack = activeTrack;
    function validateTrackNumber() {
        var numTracks = tracks.length;
        if (currentTrackIndex < 0) {
            currentTrackIndex = 0;
        }
        else if (currentTrackIndex >= numTracks) {
            currentTrackIndex = numTracks - 1;
        }
    }
    function validateNoteGroupNumber() {
        // Assume the current track number is valid.
        var track = tracks[currentTrackIndex];
        var numNoteGroups = track.length;
        var noteGroupIndex = getCurrentNoteGroupIndex();
        if (noteGroupIndex < 0) {
            setCurrentNoteGroupIndex(0);
        }
        else if (noteGroupIndex >= numNoteGroups) {
            setCurrentNoteGroupIndex(numNoteGroups - 1);
        }
    }
    function setTrackAndNoteGroup(t, n) {
        currentTrackIndex = t;
        setCurrentNoteGroupIndex(n);
        validateTrackNumber();
        validateNoteGroupNumber();
        update();
        scrollNoteGroupIntoView(t, n);
    }
    Highlight.setTrackAndNoteGroup = setTrackAndNoteGroup;
    function prevTrack() {
        currentTrackIndex--;
        validateTrackNumber();
        update();
    }
    Highlight.prevTrack = prevTrack;
    function nextTrack() {
        currentTrackIndex++;
        validateTrackNumber();
        update();
    }
    Highlight.nextTrack = nextTrack;
    function getCurrentNoteGroupIndex() {
        return currentNoteGroupIndexForTrackIndex[currentTrackIndex];
    }
    function setCurrentNoteGroupIndex(i) {
        currentNoteGroupIndexForTrackIndex[currentTrackIndex] = i;
    }
    function prevNoteGroup() {
        currentNoteGroupIndexForTrackIndex[currentTrackIndex]--;
        validateUpdateScroll();
    }
    Highlight.prevNoteGroup = prevNoteGroup;
    function nextNoteGroup() {
        currentNoteGroupIndexForTrackIndex[currentTrackIndex]++;
        validateUpdateScroll();
    }
    Highlight.nextNoteGroup = nextNoteGroup;
    function firstNoteGroup() {
        setCurrentNoteGroupIndex(0);
        validateUpdateScroll();
    }
    Highlight.firstNoteGroup = firstNoteGroup;
    function lastNoteGroup() {
        var track = tracks[currentTrackIndex];
        var numNoteGroups = track.length;
        setCurrentNoteGroupIndex(numNoteGroups - 1);
        validateUpdateScroll();
    }
    Highlight.lastNoteGroup = lastNoteGroup;
    function validateUpdateScroll() {
        validateNoteGroupNumber();
        update();
        scrollNoteGroupIntoView(currentTrackIndex, getCurrentNoteGroupIndex());
    }
})(Highlight || (Highlight = {}));
/////////////////////////////////////////////////////////////////////////////////
// Wrap all our various MIDI APIs into a single namespace.
var MIDI;
(function (MIDI) {
    var midiFile = null;
    var midiEvents = null;
    function hasLoadedAFile() {
        return midiFile !== null;
    }
    MIDI.hasLoadedAFile = hasLoadedAFile;
    // Use jsmidgen to create a MIDI file that we can encode in base 64.
    // https://github.com/dingram/jsmidgen
    function getFileFromTracks() {
        var file = new Midi.File();
        var BPM = 240; // Normally I'd choose 120, but 240 might give us better time resolution?
        var TICKS_PER_SECOND = 512; // => (128 * BPM / 60.0)  jsmidgen has a hard-coded 128 ticks per beat.
        var TICKS_PER_MILLISECOND = TICKS_PER_SECOND / 1000.0;
        // For now, just have every note play for one second.
        // const DURATION_MS = 100;
        // const DURATION_TICKS = DURATION_MS * TICKS_PER_MILLISECOND;
        var _loop_2 = function(track) {
            var isChecked = $("#track-" + track.trackNumber + "-checkbox").prop('checked');
            if (!isChecked) {
                return "continue";
            }
            var channel = 0; // For now, always use channel 0.
            var midiTrack = new Midi.Track();
            midiTrack.setTempo(BPM);
            // https://www.midi.org/specifications/item/gm-level-1-sound-set
            var instrumentNumber = 74; // 7 === Harpsichord, 25 == Acoustic Guitar Nylon, 74 == Flute
            // MIDI Instrument Codes are (instrumentNumber - 1) expressed in hexadecimal
            // For example: Acoustic Guitar Nylon's is # 25 (dec) so its Instrument Code is 24 (dec) === 0x18 (hex)
            midiTrack.setInstrument(channel, instrumentNumber - 1);
            var lastEventTimeMillis = 0;
            var lastDurationMillis = 0;
            var numNoteGroups = track.length;
            var _loop_3 = function(n) {
                var noteGroup = track[n];
                var playTimeMillis = noteGroup.playTimeMillis;
                var deltaTimeMillis = playTimeMillis - lastEventTimeMillis - lastDurationMillis;
                var deltaTimeTicks = deltaTimeMillis * TICKS_PER_MILLISECOND;
                lastEventTimeMillis = playTimeMillis;
                // duration will be measured as the ms/ticks from the start of the CURRENT event to the start of the NEXT event.
                var nextNoteIndex = n + 1;
                var durationTicks = 0;
                if (nextNoteIndex === numNoteGroups) {
                    durationTicks = TICKS_PER_SECOND; // 1 second duration on the last note.
                }
                else {
                    var nextNoteGroupPlayTime = track[nextNoteIndex].playTimeMillis;
                    var durationMillis = nextNoteGroupPlayTime - playTimeMillis;
                    durationTicks = durationMillis * TICKS_PER_MILLISECOND;
                }
                lastDurationMillis = durationTicks / TICKS_PER_MILLISECOND;
                if (noteGroup.notes.length === 1) {
                    // Simple Case: NoteGroup contains a single note.
                    var note = noteGroup.notes[0];
                    midiTrack.noteOn(channel, note.midiNote, deltaTimeTicks, note.velocity);
                    midiTrack.noteOff(channel, note.midiNote, durationTicks);
                }
                else {
                    // Multiple Notes (e.g., a Chord)
                    noteGroup.notes.forEach(function (note, index) {
                        if (index === 0) {
                            midiTrack.noteOn(channel, note.midiNote, deltaTimeTicks, note.velocity);
                        }
                        else {
                            // Since we are playing a chord, other notes of this NoteGroup start at the same time.
                            // Thus, the deltaTimeTicks == 0
                            midiTrack.noteOn(channel, note.midiNote, 0, 127 /* velocity */);
                        }
                    });
                    noteGroup.notes.forEach(function (note, index) {
                        if (index === 0) {
                            // deltaTimeTicks == duration of the note.
                            midiTrack.noteOff(channel, note.midiNote, durationTicks);
                        }
                        else {
                            // Since we are stopping the chord, other notes of this NoteGroup stop at the same time.
                            // Thus, the deltaTimeTicks == 0
                            midiTrack.noteOff(channel, note.midiNote, 0);
                        }
                    });
                }
            };
            for (var n = 0; n < numNoteGroups; n++) {
                _loop_3(n);
            }
            file.addTrack(midiTrack);
        };
        for (var _i = 0, tracks_2 = tracks; _i < tracks_2.length; _i++) {
            var track = tracks_2[_i];
            var state_3 = _loop_2(track);
            if (state_3 === "continue") continue;
        }
        return file.toBytes();
    }
    MIDI.getFileFromTracks = getFileFromTracks;
    function getFileFromTracksV1() {
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
    MIDI.getFileFromTracksV1 = getFileFromTracksV1;
    function parseData(arrayBuffer) {
        console.log('parseData');
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
        fillTracksWithNoteGroups();
        var lyrics = midiFile.getLyrics();
        if (lyrics.length > 0) {
            console.log("Lyrics Track " + lyrics.length + " events.");
        }
        // Calculate song duration.
        var lastMidiEvent = midiEvents[midiEvents.length - 1]; // Probably a MIDIEvents.EVENT_MIDI_NOTE_OFF event.
        var songDurationInMillis = lastMidiEvent.playTime;
        var songDurationInSeconds = songDurationInMillis / 1000;
        displaySongInfo({
            numTracks: numTracks,
            duration: songDurationInSeconds
        });
    }
    function readFile(file) {
        console.log('readFile ' + file);
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
            var arrayBuffer = e.target.result;
            displayFileInfo(file);
            parseData(arrayBuffer);
        });
        reader.addEventListener('error', function (err) {
            console.error('FileReader error' + err);
        });
        reader.readAsArrayBuffer(file);
    }
    MIDI.readFile = readFile;
    function fillTracksWithNoteGroups() {
        setupTracks(midiFile.tracks.length);
        // Convert from MIDI events to NoteGroups
        midiEvents = midiFile.getMidiEvents();
        // Remember the most recently processed event so that we can merge notes that are played at the same time and on the same track.
        var lastNoteGroup = null;
        var lastPlayTime = -1;
        var lastTrackIndex = -1;
        for (var _i = 0, midiEvents_1 = midiEvents; _i < midiEvents_1.length; _i++) {
            var event_1 = midiEvents_1[_i];
            var type = event_1.type;
            var subtype = event_1.subtype;
            // let status = (event.subtype << 4) + event.channel;
            // let statusCodeHexString = '0x' + status.toString(16).toUpperCase();
            var trackIndex = event_1.track;
            var playTime = event_1.playTime; // time in milliseconds
            playTime = Math.round(playTime * 1000) / 1000; // round it to the nearest 0.001
            var midiNoteNum = event_1.param1;
            var velocity = event_1.param2;
            var pianoNoteNum = m2p(midiNoteNum);
            var noteToPlay = new Note(pianoNoteNum, 1.0 /* duration */, velocity); // TODO: Support duration someday?
            if (subtype === MIDIEvents.EVENT_MIDI_NOTE_ON) {
                if ((playTime <= lastPlayTime + TIME_THRESHOLD_FOR_GROUPING_NEARBY_NOTES) &&
                    trackIndex === lastTrackIndex) {
                    // Merge all notes starting at the same time and on the same track into a single NoteGroup.
                    lastNoteGroup.addNote(noteToPlay);
                }
                else {
                    var noteGroup = new NoteGroup(noteToPlay, playTime, trackIndex);
                    var currTrack = tracks[trackIndex];
                    noteGroup.noteIndex = currTrack.length;
                    currTrack.push(noteGroup);
                    lastNoteGroup = noteGroup;
                    lastTrackIndex = trackIndex;
                    lastPlayTime = playTime;
                }
            }
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
    var clockStartTime = 0;
    var clock = new Worker('/s/js/author/piano2worker.js');
    var clockIsTicking = false;
    clock.onmessage = function (e) {
        playNextEvents(performance.now());
    };
    var noteGroupsToPlay = [];
    var isPaused = false;
    var nextEventPlayTime = 0;
    function isPlaying() {
        return clockIsTicking;
    }
    Playback.isPlaying = isPlaying;
    // starts or resumes playback
    function play() {
        if (isPaused) {
            baseSongTime = currSongTime;
        }
        else {
            if (isPlaying()) {
                stop();
            }
            // Start the MIDI playback.
            noteGroupsToPlay = getNoteGroupsFromTracks();
            if (noteGroupsToPlay.length === 0) {
                Playback.stop();
                return; // DONE!
            }
            currSongTime = 0;
            baseSongTime = 0;
            determinePlayTimeForNextEvent();
        }
        isPaused = false;
        clockStartTime = performance.now();
        clock.postMessage('start');
        clockIsTicking = true;
    }
    Playback.play = play;
    function pause() {
        stopTheClock();
        isPaused = true; // Next time, continue from where we left off.
    }
    Playback.pause = pause;
    function togglePlayPause() {
        if (isPlaying()) {
            pause();
        }
        else {
            play();
        }
    }
    Playback.togglePlayPause = togglePlayPause;
    function stop() {
        stopTheClock();
        noteGroupsToPlay = [];
    }
    Playback.stop = stop;
    function stopTheClock() {
        if (isPlaying()) {
            clock.postMessage('stop');
            clockIsTicking = false;
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
        while (currSongTime >= nextEventPlayTime) {
            var noteGroup = noteGroupsToPlay.shift();
            Highlight.setTrackAndNoteGroup(noteGroup.trackIndex, noteGroup.noteIndex);
            for (var _i = 0, _a = noteGroup.notes; _i < _a.length; _i++) {
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
    }
    function determinePlayTimeForNextEvent() {
        nextEventPlayTime = noteGroupsToPlay[0].playTimeMillis;
        if (nextEventPlayTime === -1) {
            nextEventPlayTime = currSongTime + TIME_BETWEEN_NOTEGROUPS; // If the playTime isn't specified, we play the next note every 200ms!
        }
    }
    function setupButtons() {
        $playButton.click(play);
        $pauseButton.click(pause);
        $stopButton.click(stop);
    }
    Playback.setupButtons = setupButtons;
})(Playback || (Playback = {}));
// Retrieve the notegroups to play or save to file.
function getNoteGroupsFromTracks() {
    var noteGroups = [];
    var currTimeMillis = 0; // Used when our NoteGroups don't have valid timing information (i.e., manual entry).
    var trackIsChecked = []; // ignore unchecked tracks
    var trackIndexes = []; // keep pointers to the current NoteGroups we are looking at
    var numTracks = tracks.length;
    for (var t = 0; t < numTracks; t++) {
        var isChecked = $("#track-" + t + "-checkbox").prop('checked');
        trackIsChecked.push(isChecked);
        trackIndexes.push(0);
    }
    // Round robin between the tracks until we insert all the NoteGroups properly. Always choose the NoteGroup with the minimum playTime.
    while (true) {
        var minPlayTime = Number.MAX_VALUE;
        var nextNoteGroup = null;
        var nextNoteGroupTrack = null; // Which track contains the next note group to play?
        // Loop through all the tracks to find the next NoteGroup to play.
        for (var t = 0; t < numTracks; t++) {
            var currTrack = tracks[t];
            var currTrackIndex = trackIndexes[t];
            var currTrackLength = currTrack.length;
            if (currTrackLength === 0 || !trackIsChecked[t] || currTrackIndex >= currTrackLength) {
                continue;
            }
            else {
                var noteGroup = currTrack[currTrackIndex];
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
        }
        else {
            var ng = nextNoteGroup.copy();
            if (ng.playTimeMillis === -1) {
                ng.playTimeMillis = currTimeMillis;
            }
            var t = nextNoteGroupTrack.trackNumber;
            var noteNumber = trackIndexes[t];
            ng.noteIndex = noteNumber;
            trackIndexes[t]++;
            noteGroups.push(ng);
            currTimeMillis = ng.playTimeMillis + TIME_BETWEEN_NOTEGROUPS;
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
    setupCopyHandler();
    setupPianoContext2d();
    setupPianoMouseHandlers();
    drawPiano();
}
function setupPianoContext2d() {
    var elem = document.getElementById('pianoCanvas');
    pianoContext2dWidth = elem.width;
    pianoContext2dHeight = elem.height;
    pianoContext2d = elem.getContext('2d');
}
function setupPianoMouseHandlers() {
    var whiteKeyOffsets = [1, 3, 4, 6, 8, 9, 11]; // A B C D E F G
    function getPianoKeyNumberForMouseLocaion(x, y) {
        // TODO: ALSO HANDLE BLACK KEYS?
        // WHITE KEYS ONLY
        var whiteKeyNumber = Math.floor(x / 20);
        var remainder = whiteKeyNumber % 7;
        var octaveOffset = Math.floor(whiteKeyNumber / 7);
        return octaveOffset * 12 + whiteKeyOffsets[remainder];
    }
    var $piano = $('#pianoCanvas');
    $piano.mousedown(function (e) {
        var offsetLeft = this.offsetLeft;
        var offsetTop = this.offsetTop;
        var x = e.pageX - offsetLeft;
        var y = e.pageY - offsetTop;
        var pianoKeyNumber = getPianoKeyNumberForMouseLocaion(x, y);
        var lastKeyNumber = pianoKeyNumber;
        play(pianoKeyNumber);
        $piano.mousemove(function (e) {
            var x = e.pageX - offsetLeft;
            var y = e.pageY - offsetTop;
            var pianoKeyNumber = getPianoKeyNumberForMouseLocaion(x, y);
            if (pianoKeyNumber !== lastKeyNumber) {
                console.log(pianoKeyNumber);
                lastKeyNumber = pianoKeyNumber;
                play(pianoKeyNumber);
            }
        });
    });
    $('html').mouseup(function (e) {
        $piano.unbind('mousemove');
    });
}
function setupCopyHandler() {
    document.querySelector('html').addEventListener('copy', function (e) {
        e.preventDefault();
        if (e.clipboardData) {
            e.clipboardData.setData('text/plain', TEXT.getFileFromTracks());
        }
    });
}
$(function () {
    go();
});
//# sourceMappingURL=piano2.js.map