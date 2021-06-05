namespace Constants {
    export const MIN_SONG_VERSION = 1;
    export const MAX_SONG_VERSION = 2;

    // Keys for use in Redux and/or localStorage
    export namespace StoreKeys {
        export const SONG_VERSION = "songVersion"; // redux + localStorage
        export const FILE_TIMESTAMP = "fileTimestamp"; // redux
        export const UPDATED_TRACKS_LIST = "updatedTracks"; // redux. Array of track numbers (e.g., [0, 3, 4]).
        export const UPDATED_TRACKS_TIMESTAMP = "updatedTracksTimestamp"; // redux.

        // Users can click on checkboxes to select which tracks to save (in Piano Author V2).
        export const CHECKBOXES = "checkboxes"; // localStorage
        export const TRACKS = "tracks"; // localStorage
        export const TRACK_NUMBER = "trackNumber"; // redux
        export const CHECKBOX_VALUE = "checkboxValue"; // redux
        export const TRACK_NUMBER_TO_CHECKBOX_VALUE = "trackNumber=>checkboxValue"; // redux

        export const PLAYED_NOTEGROUP_ID = "playedNoteGroupID"; // redux. During song playback, this specifies the note we just played. e.g., t2_n78

        // Remember the user's choices in our piano / guitar authoring tools & test pages.
        export const PIANO_TYPE = "pianoType"; // localStorage
        export const PIANO_TAB = "pianoTab"; // localStorage
        export const GUITAR_TYPE = "guitarType"; // localStorage
        export const GUITAR_TAB = "guitarTab"; // localStorage
        export const INSTRUMENT_TYPE = "instrumentType"; // localStorage
        export const GUITAR_STRING_OFFSET = "guitarStringOffset"; // localStorage
        export const GUITAR_FRET_OFFSET = "guitarFretOffset"; // localStorage
    }

    export const DEFAULT_DOWNLOAD_DATA = "8J+OtQ=="; // base 64 encoded!

    export namespace Instrument {
        export const GUITAR = "guitar";
        export const UKULELE_HIGH_G = "ukulele_high_g";
        export const UKULELE_LOW_G = "ukulele_low_g";
    }

    export const Messages = {
        COMPUTER_KEYBOARD_INPUT_1: "Click here to use your computer's keyboard to play notes.",
        COMPUTER_KEYBOARD_INPUT_2: "Type ASDFGHJKL;' to play music.  To change octaves, press ctrl+alt+shift ArrowLeft or ArrowRight.",
    };
}

export default Constants;
