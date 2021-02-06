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
    }

    export const DEFAULT_DOWNLOAD_DATA = "8J+OtQ=="; // base 64 encoded!
}

export default Constants;
