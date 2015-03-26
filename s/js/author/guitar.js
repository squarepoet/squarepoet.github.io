var FRET_DX = 85,
    FRET_OFFSET = 20;
var noteOffsetForString = [0,7,2,10,5,0,7]; // [X] E B G D A E


// Converts a piano note (C4 == 40) to MIDI (C4 == 60)
// This API expects a negative number to signify MIDI.
function pianoNote(num) {
    return -(num + 20);
}

var piano = new Instrument('piano');



// which character to type to get the corresponding note
var keyboardLabels = [['1','2','3','4','5','6','7','8','9','0'],
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l',';'],
    ['z','x','c','v','b','n','m',',','.','/']];
var fretOffset = 0,
    stringOffset = 0;

var $text, $sharps, $flats;
var noteGroups = [];

var noteLabels = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

var stringToPianoKey = {
    1:44, // E
    2:39, // B
    3:35, // G
    4:30, // D
    5:25, // A
    6:20  // E
};

var keyCodeToFret = {
    90:0, // z
    88:1, // x
    67:2, // c
    86:3, // v
    66:4, // b
    78:5, // n
    77:6, // m
    188:7, // ,
    190:8, // .
    191:9, // /
    //
    65:0, // a => G
    83:1, // s => A
    68:2, // d => B
    70:3, // f => C4
    71:4, // g => D
    72:5, // h => E
    74:6, // j => F
    75:7, // k => G
    76:8, // l => A
    186:9,// ; => B
    222:10,// ' => C5
    //
    81:0, // q => G
    87:1, // w => A
    69:2, // e => B
    82:3, // r => C5
    84:4, // t => D
    89:5, // y => E
    85:6, // u => F
    73:7, // i => G
    79:8, // o => A
    80:9, // p => B
    219:10,// [ => C6
    221:11,// ] => D
    220:12,// \ => E
    //
    49:0,  // 1 => G
    50:1,  // 2 => A
    51:2,  // 3 => B
    52:3,  // 4 => C6
    53:4,  // 5 => D
    54:5,  // 6 => E
    55:6,  // 7 => F
    56:7,  // 8 => G
    57:8,  // 9 => A
    48:9,  // 0 => B
    189:10, // - => C7
    187:11  // = => D
};

var keyCodeToString = {
    90:4, // z
    88:4, // x
    67:4, // c
    86:4, // v
    66:4, // b
    78:4, // n
    77:4, // m
    188:4, // ,
    190:4, // .
    191:4, // /
    //
    65:3, // a => G
    83:3, // s => A
    68:3, // d => B
    70:3, // f => C4
    71:3, // g => D
    72:3, // h => E
    74:3, // j => F
    75:3, // k => G
    76:3, // l => A
    186:3,// ; => B
    222:3,// ' => C5
    //
    81:2, // q => G
    87:2, // w => A
    69:2, // e => B
    82:2, // r => C5
    84:2, // t => D
    89:2, // y => E
    85:2, // u => F
    73:2, // i => G
    79:2, // o => A
    80:2, // p => B
    219:2,// [ => C6
    221:2,// ] => D
    220:2,// \ => E
    //
    49:1,  // 1 => G
    50:1,  // 2 => A
    51:1,  // 3 => B
    52:1,  // 4 => C6
    53:1,  // 5 => D
    54:1,  // 6 => E
    55:1,  // 7 => F
    56:1,  // 8 => G
    57:1,  // 9 => A
    48:1,  // 0 => B
    189:1, // - => C7
    187:1  // = => D
};

// resets the key offset
function resetOffsets() {
    fretOffset = 0;
    stringOffset = 0;
    saveAndShowData();
}

function resetData() {
    noteGroups = [];
    saveAndShowData();
}

function deleteLastGroup() {
    noteGroups.pop();
    saveAndShowData();
}

function saveAndShowData() {
    var newText = noteGroups.join(" ");
    localStorage.text = newText;
    $text.val(newText);
    drawGuitar();
}

// XXXX32 => { 6:'X', 5:'X', 4:'X', 3:'X', 2:'3', 1:'2' }
function splitNoteGroup(noteGroup) {
    var result = { 6:'X',5:'X',4:'X',3:'X',2:'X',1:'X'};

    if (noteGroup.length == 6) { //
        var items = noteGroup.toUpperCase().split("").reverse();
        for (var s=1; s<=6; s++) {
            if (items[s-1] != "X") {
                result[s] = items[s-1];
            }
        }
    } else { // e.g., 3_2
        var string_fret = noteGroup.split("_");
        var s = string_fret[0];
        var f = string_fret[1];
        result[s] = f;
    }

    return result;
}


// 2_3 1_2 => XXXX32
// 4_0 XXX232 => XX0232
// XX02XX XXXX32 => XX0232
function mergeLastTwoGroups() {
    if (noteGroups.length < 2) {
        return;
    }

    var lastGroup = noteGroups.pop();
    var lastLastGroup = noteGroups.pop();

    var mergedNoteGroup = ['X','X','X','X','X','X'];

    function mergeGroupIntoArray(g, arr) {
        if (g.length == 6) { //
            var items = g.toUpperCase().split("");
            for (var i=0; i<6; i++) {
                if (items[i] != "X") {
                    arr[i] = items[i];
                }
            }
        } else { // e.g., 3_2
            var string_fret = g.split("_");
            var s = string_fret[0];
            var f = string_fret[1];
            arr[6 - s] = f;
        }
    }

    mergeGroupIntoArray(lastLastGroup, mergedNoteGroup);
    mergeGroupIntoArray(lastGroup, mergedNoteGroup);

    noteGroups.push(mergedNoteGroup.join(""));

    saveAndShowData();
}

// 1040 x 280 tall.
function drawStringsAndFrets(c) {
    // 0th fret
    c.fillStyle = "rgba(0,0,0,0.1)";
    c.fillRect(0, 0, 30, 280);

    c.lineWidth = 0.9;

    // 6 strings
    for (var s=1; s<=6; s++) {
        c.beginPath();
        c.strokeStyle = "rgba(0, 0, 0, "+0.25*s+")";
        c.moveTo(0,s*40);
        c.lineTo(1040,s*40);
        c.stroke();
    }

    c.beginPath();
    c.lineWidth = 1;
    c.strokeStyle = "rgba(0, 0, 0, 0.5)";

    // 11 vertical lines (handling frets 0 => 12)
    for (var f=1; f<=11; f++) {
        var x = f * FRET_DX + FRET_OFFSET;
        c.beginPath();
        c.moveTo(x,0);
        c.lineTo(x,280);
        c.stroke();
    }
}

function drawMostRecentGroup(c) {
    if (noteGroups.length == 0) {
        return;
    }

    var lastGroup = noteGroups[noteGroups.length-1]; // the last item
    var items = splitNoteGroup(lastGroup);

    for (var s=1; s<=6; s++) {
        var f = items[s];
        if (f == "X") {
            continue;
        }
        f = parseInt(f);

        var localFretOffset = (f==0) ? 15 : FRET_OFFSET - FRET_DX/2;
        var x = f * FRET_DX + localFretOffset;
        var y = s * 40;

        c.beginPath();
        c.arc(x, y, 14, 0, 2 * Math.PI);
        c.fillStyle = 'rgba(165,165,0,0.5)';
        c.fill();
    }
}

function drawGuitar() {
    var elem = document.getElementById('guitarCanvas');
    if (!elem || !elem.getContext) {
        return;
    }
    var c = elem.getContext('2d');
    if (!c) {
        return;
    }

    // clear the background
    c.fillStyle="#FFF";
    c.fillRect(0,0,elem.width,elem.height);

    drawStringsAndFrets(c);
    drawKeyLabels(c);
    drawMostRecentGroup(c);
}

function drawKeyLabels(c) {
    c.font = "14px Tahoma";
    c.fillStyle = "#777";
    c.strokeStyle = "rgba(255,255,255,0.86)";
    c.lineJoin = "round";
    c.lineWidth = 7;

    // draw the note name
    for (var s=1; s<=6; s++) {
        for (var f=0;f<=12;f++) {
            var localFretOffset = (f==0) ? 10 : 15 - FRET_DX/2;
            var noteOffset = noteOffsetForString[s];
            var noteLabel = noteLabels[(noteOffset + f) % 12];
            var x = f * FRET_DX + localFretOffset;
            var y = s * 40 + 6;
            c.strokeText(noteLabel, x, y);
            c.fillText(noteLabel, x, y);
        }
    }

    // draw the keyboard labels
    c.font = "14px Consolas";
    c.fillStyle = "#000";
    for (var s=1; s<=4; s++) {
        for (var f=0;f<10;f++) {
            var keyLabel = keyboardLabels[s-1][f];
            var adjustedFret = f + fretOffset;
            var localFretOffset = (adjustedFret==0) ? 10 : 15 - FRET_DX/2;
            var x = adjustedFret * FRET_DX + localFretOffset;
            var y = (s + stringOffset) * 40 + 21;
            c.fillText(keyLabel, x, y);
        }
    }
}

function loadSharpsAndFlats() {
    if (!localStorage.sharps) {
        localStorage.sharps = "";
    }
    $sharps.val(localStorage.sharps);

    if (!localStorage.flats) {
        localStorage.flats = "";
    }
    $flats.val(localStorage.flats);
}

function loadNoteGroups() {
    if (!localStorage.text) {
        localStorage.text = "";
    }

    var text = localStorage.text.trim();
    if (text == "") {
        noteGroups = [];
    } else {
        noteGroups = text.split(" ");
    }
    $text.val(noteGroups.join(" "));
}

function play(keyCode, sharpModifier) {
    if (!keyCodeToFret.hasOwnProperty(keyCode)) {
        return;
    }

    var adjustedFret = keyCodeToFret[keyCode] + fretOffset;
    var adjustedString = keyCodeToString[keyCode] + stringOffset;

    var noteOffset = noteOffsetForString[adjustedString];
    var noteLabel = noteLabels[(noteOffset + adjustedFret) % 12].toLowerCase();

    // is this note auto-sharped, due to the key signature?
    if ($sharps.val().toLowerCase().indexOf(noteLabel) != -1) {
        sharpModifier++; // raise the sharp a half-step!
    }
    // is this note auto-flatted, due to the key signature?
    if ($flats.val().toLowerCase().indexOf(noteLabel) != -1) {
        sharpModifier--; // lower the note a half-step!
    }

    adjustedFret += sharpModifier;

    noteGroups.push(adjustedString + "_" + adjustedFret); // push the string onto our array

    var pianoKeyNumber = stringToPianoKey[adjustedString] + adjustedFret;
    piano.tone({pitch: pianoNote(pianoKeyNumber), duration: 1.0});
    saveAndShowData();
}

$(function() {
    $text = $("#textarea");
    $sharps = $("#sharps_textarea");
    $flats = $("#flats_textarea");

    loadNoteGroups();
    loadSharpsAndFlats();

    $(document).bind('keyup', function(e) {
        // update our sharps / flats
        if ($sharps.is(":focus")) {
            localStorage.sharps = $sharps.val().toLowerCase();
            return;
        }
        if ($flats.is(":focus")) {
            localStorage.flats = $flats.val().toLowerCase();
            return;
        }
    });

    $(document).bind('keydown', function(e) {
        if ($sharps.is(":focus") || $flats.is(":focus")) {
            return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
        }

        if (e.keyCode == 91 || e.keyCode == 93) { // CMD KEY on Mac
            $text.select();
        }

        if (e.metaKey) {
            if (e.keyCode == 88 || e.keyCode == 67) { // CMD + X or CMD + C
                setTimeout(resetData, 100);
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
                    resetData();
                } else {
                    resetOffsets();
                }
                break;
            case 8: // BACKSPACE/DEL
                deleteLastGroup();
                break;
            case 9: // TAB
                mergeLastTwoGroups();
                // TODO: Also support unmerging?
                break;
            case 37: // LEFT
                // shift the keyboard offset to the left by 1
                fretOffset--;
                if (fretOffset < 0) {
                    fretOffset = 0;
                }
                drawGuitar();
                break;
            case 39: // RIGHT
                // shift the keyboard offset to the right by 1
                fretOffset++;
                if (fretOffset > 3) {
                    fretOffset = 3;
                }
                drawGuitar();
                break;
            case 38: // UP
                // shift the keyboard offset up by 1
                stringOffset--;
                if (stringOffset < 0) {
                    stringOffset = 0;
                }
                drawGuitar();
                break;
            case 40: // DOWN
                // shift the keyboard offset down by 1
                stringOffset++;
                if (stringOffset > 2) {
                    stringOffset = 2;
                }
                drawGuitar();
                break;
            default:
                play(e.keyCode, sharpModifier);
                break;
        }
    });

    drawGuitar();
});
