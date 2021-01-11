namespace Utils {
    // For example: We can use this to check if the text cursor is inside a HTMLInputElement.
    export function isFocusedOnElementWithID(elementID: string) {
        return document.getElementById(elementID) === document.activeElement;
    }
}

export default Utils;
