// Curried function.
const Logger = (store) => (next) => (action) => {
    let result;
    /*
    console.group("REDUX DISPATCH => " + action.type); // Indent the following logs.
    {
        console.log("action");
        console.dir(action);
        result = next(action);
        console.log("state");
        console.dir(store.getState());
    }
    console.groupEnd();
    */
    result = next(action);
    return result;
};

export default Logger;
