/////////////////////////////////////////////////////////////////////////////////

// Highlight the track, track info, and note group.
// Do this by adding the "highlight" class to:
// .track DIVs
// .track-info DIVs.
// .notegroup DIVs
namespace Highlight {
    let currTrackNumber: number = 0;
    let currNoteGroupNumberForTrackNumber: number[] = [];

    let setHighlightedTrackNumber: Function = null;
    let setHighlightedNoteGroupNumber: Function = null;
    let getNumTracks: Function = null;
    let getNumNoteGroupsInTrack: Function = null;
    let scrollNoteGroupIntoView: Function = null;
    let drawPiano: Function = null;

    export function setupCallbacks(
        setHighlightedTrackNumberFcn: Function,
        setHighlightedNoteGroupNumberFcn: Function,
        drawPianoFcn: Function,
        getNumTracksFcn: Function,
        getNumNoteGroupsInTrackFcn: Function,
        scrollNoteGroupIntoViewFcn: Function
    ) {
        setHighlightedTrackNumber = setHighlightedTrackNumberFcn;
        setHighlightedNoteGroupNumber = setHighlightedNoteGroupNumberFcn;
        drawPiano = drawPianoFcn;
        getNumTracks = getNumTracksFcn;
        getNumNoteGroupsInTrack = getNumNoteGroupsInTrackFcn;
        scrollNoteGroupIntoView = scrollNoteGroupIntoViewFcn;
    }

    export function setupIndexes(numTracks: number) {
        currTrackNumber = 0;
        currNoteGroupNumberForTrackNumber = [];
        for (let t = 0; t < numTracks; t++) {
            currNoteGroupNumberForTrackNumber.push(0);
        }
    }

    export function getCurrentTrackNumber(): number {
        return currTrackNumber;
    }

    export function getCurrentNoteGroupNumber(): number {
        return currNoteGroupNumberForTrackNumber[currTrackNumber];
    }

    function setCurrentNoteGroupNumber(n: number) {
        currNoteGroupNumberForTrackNumber[currTrackNumber] = n;
    }

    // Updates the visual indicators for our current track and current notegroup.
    export function update() {
        setHighlightedTrackNumber(getCurrentTrackNumber());
        setHighlightedNoteGroupNumber(getCurrentNoteGroupNumber());
        drawPiano();
    }

    function validateTrackNumber() {
        const numTracks = getNumTracks();
        if (currTrackNumber < 0) {
            currTrackNumber = 0;
        } else if (currTrackNumber >= numTracks) {
            currTrackNumber = numTracks - 1;
        }
    }

    function validateNoteGroupNumber() {
        // Assume the current track number is valid.
        const numNoteGroups = getNumNoteGroupsInTrack(currTrackNumber);
        const noteGroupNumber = getCurrentNoteGroupNumber();
        if (noteGroupNumber < 0) {
            setCurrentNoteGroupNumber(0);
        } else if (noteGroupNumber >= numNoteGroups) {
            setCurrentNoteGroupNumber(numNoteGroups - 1);
        }
    }

    export function setTrackAndNoteGroup(t: number, n: number) {
        currTrackNumber = t;
        setCurrentNoteGroupNumber(n);
        validateTrackNumber();
        validateUpdateScroll();
    }

    export function prevTrack() {
        currTrackNumber--;
        validateTrackNumber();
        update();
    }

    export function nextTrack() {
        currTrackNumber++;
        validateTrackNumber();
        update();
    }

    export function prevNoteGroup() {
        currNoteGroupNumberForTrackNumber[currTrackNumber]--;
        validateUpdateScroll();
    }

    export function nextNoteGroup() {
        currNoteGroupNumberForTrackNumber[currTrackNumber]++;
        validateUpdateScroll();
    }

    export function firstNoteGroup() {
        setCurrentNoteGroupNumber(0);
        validateUpdateScroll();
    }

    export function lastNoteGroup() {
        let numNoteGroups = getNumNoteGroupsInTrack(currTrackNumber);
        setCurrentNoteGroupNumber(numNoteGroups - 1);
        validateUpdateScroll();
    }

    function validateUpdateScroll() {
        validateNoteGroupNumber();
        update();
        scrollNoteGroupIntoView(currTrackNumber, getCurrentNoteGroupNumber());
    }
}

export default Highlight;
