namespace Constants {
    export const MIN_SONG_VERSION = 1;
    export const MAX_SONG_VERSION = 2;

    export namespace StoreKeys {
        export const SONG_VERSION = "songVersion";

        export const FILE_TIMESTAMP = "fileTimestamp";

        export const UPDATED_TRACKS_LIST = "updatedTracks"; // Array of track numbers (e.g., [0, 3, 4])
        export const UPDATED_TRACKS_TIMESTAMP = "updatedTracksTimestamp";
    }

    export const DEFAULT_DOWNLOAD_DATA = "8J+OtQ=="; // base 64 encoded!
}

export default Constants;
