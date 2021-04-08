import store from "store2";

namespace StorageUtils {
    // Returns a getter function and a setter function, inspired by React's useState.
    // Automatically makes sure that our stored value is NEVER null or undefined.
    export function storageHandlersForKey<Type>(storageKey: string, defaultValue: Type) {
        const setHandler: (newValue: Type) => void = (newValue: Type) => {
            if (newValue === null || typeof newValue === "undefined") {
                store.set(storageKey, defaultValue);
            } else {
                store.set(storageKey, newValue);
            }
        };

        const getHandler: () => Type = () => {
            return (store.get(storageKey) ?? defaultValue) as Type;
        };

        // Make sure that the stored value is NEVER null or undefined.
        const storedValue = store.get(storageKey); // Possibly null or undefined.
        if (storedValue === null || typeof storedValue === "undefined") {
            store.set(storageKey, defaultValue);
        }

        return [getHandler, setHandler] as [() => Type, (newValue: Type) => void];
    }
}

export default StorageUtils;
