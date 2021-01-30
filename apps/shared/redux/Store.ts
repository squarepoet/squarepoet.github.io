import Constants from "apps/shared/Constants";
import Actions from "apps/shared/redux/Actions";
import loggerMiddleware from "apps/shared/redux/Logger";
import { useMemo } from "react";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const Keys = Constants.StoreKeys;
let sharedStoreInstance = null;

const defaultInitialState = {};
defaultInitialState[Keys.SONG_VERSION] = 1; // 1 | 2
defaultInitialState[Keys.FILE_TIMESTAMP] = 0;
defaultInitialState[Keys.UPDATED_TRACKS_LIST] = [];
defaultInitialState[Keys.UPDATED_TRACKS_TIMESTAMP] = 0;

const reducer = (state = defaultInitialState, action) => {
    let retVal = { ...state };
    switch (action.type) {
        case Actions.Toggle.onSongVersionFormatChanged: {
            let songVersion = action.payload[Constants.StoreKeys.SONG_VERSION];
            if (typeof songVersion !== "number" || songVersion < Constants.MIN_SONG_VERSION || songVersion > Constants.MAX_SONG_VERSION) {
                songVersion = defaultInitialState[Keys.SONG_VERSION];
            }
            console.log(`Song version set to ${songVersion}`);
            retVal[Keys.SONG_VERSION] = songVersion;
            break;
        }
        case Actions.FileChooser.onFileLoaded: {
            retVal[Keys.FILE_TIMESTAMP] = new Date().getTime();
            break;
        }
        case Actions.Song.onTracksUpdated: {
            const trackNumbers = action.payload[Constants.StoreKeys.UPDATED_TRACKS_LIST];
            retVal[Keys.UPDATED_TRACKS_LIST] = trackNumbers;
            retVal[Keys.UPDATED_TRACKS_TIMESTAMP] = new Date().getTime();
            console.log("Tracks  " + trackNumbers + " Updated!");
            break;
        }
        default: {
            break;
        }
    }
    return retVal;
};

function createStoreWithState(preloadedState = defaultInitialState) {
    return createStore(reducer, preloadedState, applyMiddleware(loggerMiddleware, thunkMiddleware));
}

export const initializeStore = (preloadedState) => {
    if (typeof window === "undefined") {
        // For static site generation (SSG) or server side rendering (SSR), we always create a new store.
        return createStoreWithState(preloadedState);
    } else {
        if (!sharedStoreInstance) {
            // Create the store once in the client.
            sharedStoreInstance = createStoreWithState(preloadedState);
        } else {
            // After navigating to a page with an initial Redux state, merge that state
            // with the current state in the store.
            if (preloadedState) {
                sharedStoreInstance = createStoreWithState({
                    // Merge two objects using spread operator.
                    ...sharedStoreInstance.getState(),
                    ...preloadedState,
                });
            }
        }

        return sharedStoreInstance;
    }
};

export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState]);
}
