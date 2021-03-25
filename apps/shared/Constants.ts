namespace Constants {
    export const MIN_SONG_VERSION = 1;
    export const MAX_SONG_VERSION = 2;

    export namespace StoreKeys {
        export const SONG_VERSION = "songVersion";

        export const FILE_TIMESTAMP = "fileTimestamp";

        export const UPDATED_TRACKS_LIST = "updatedTracks"; // Array of track numbers (e.g., [0, 3, 4])
        export const UPDATED_TRACKS_TIMESTAMP = "updatedTracksTimestamp";

        // Handle checkbox change events.
        export const TRACK_NUMBER = "trackNumber";
        export const CHECKBOX_VALUE = "checkboxValue";
        export const TRACK_NUMBER_TO_CHECKBOX_VALUE = "trackNumber=>checkboxValue";

        // e.g., t2_n78
        export const PLAYED_NOTEGROUP_ID = "playedNoteGroupID";

        // Key for localStorage
        export const PIANO_TYPE = "pianoType";
        export const GUITAR_TYPE = "guitarType";
    }

    export const DEFAULT_DOWNLOAD_DATA = "8J+OtQ=="; // base 64 encoded!

    export namespace Instrument {
        export const PIANO_GRAND_1 = "piano_grand_1";
        export const PIANO_GRAND_2 = "piano_grand_2";
        export const PIANO_ELECTRIC = "piano_electric";
        export const ORGAN_1 = "organ_1";
        export const ORGAN_2 = "organ_2";
        export const OTHER = "other";

        export const GUITAR = "guitar";
        export const UKULELE_HIGH_G = "ukulele_high_g";
        export const UKULELE_LOW_G = "ukulele_low_g";
    }
}

export default Constants;
