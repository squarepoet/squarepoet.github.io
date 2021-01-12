// Curried function.
const Logger = (store) => (next) => (action) => {
    let result;
    console.group(action.type); // Indent the following logs.
    {
        console.info("dispatching", action);
        result = next(action);
        console.log("next state", store.getState());
    }
    console.groupEnd();
    return result;
};

export default Logger;
