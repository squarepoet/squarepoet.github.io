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
defaultInitialState[Keys.TRACK_NUMBER_TO_CHECKBOX_VALUE] = {}; // { trackNumber: true|false}. If the key doesn't exist, we consider it unchecked.

const reducer = (state = defaultInitialState, action) => {
    const updatedState = { ...state };
    switch (action.type) {
        case Actions.Toggle.onSongVersionFormatChanged: {
            let songVersion = action.payload[Keys.SONG_VERSION];
            if (typeof songVersion !== "number" || songVersion < Constants.MIN_SONG_VERSION || songVersion > Constants.MAX_SONG_VERSION) {
                songVersion = defaultInitialState[Keys.SONG_VERSION];
            }
            updatedState[Keys.SONG_VERSION] = songVersion;
            break;
        }
        case Actions.FileChooser.onFileLoaded: {
            updatedState[Keys.FILE_TIMESTAMP] = new Date().getTime();
            break;
        }
        case Actions.Song.onTracksUpdated: {
            const trackNumbers = action.payload[Keys.UPDATED_TRACKS_LIST];
            updatedState[Keys.UPDATED_TRACKS_LIST] = trackNumbers;
            updatedState[Keys.UPDATED_TRACKS_TIMESTAMP] = new Date().getTime();
            break;
        }
        case Actions.Toggle.onCheckboxChanged: {
            const trackNumber = action.payload[Keys.TRACK_NUMBER];
            const checkboxValue = action.payload[Keys.CHECKBOX_VALUE];
            const trackNumberToCheckboxValue = updatedState[Keys.TRACK_NUMBER_TO_CHECKBOX_VALUE];
            trackNumberToCheckboxValue[trackNumber] = checkboxValue;
            break;
        }
        default: {
            break;
        }
    }
    return updatedState;
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
