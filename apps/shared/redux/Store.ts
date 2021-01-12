import loggerMiddleware from "apps/shared/redux/Logger";
import { useMemo } from "react";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

let sharedStoreInstance = null;

const defaultInitialState = {
    count: 0,
};

const reducer = (state = defaultInitialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 1,
            };
        case "DECREMENT":
            return {
                ...state,
                count: state.count - 1,
            };
        case "RESET":
            return {
                ...state,
                count: defaultInitialState.count,
            };
        default:
            return state;
    }
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
