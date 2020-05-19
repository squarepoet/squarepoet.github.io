import { useEffect, useRef } from "react";

let _window = null;
if (typeof window !== "undefined") {
    _window = window;
}

export default function useEventListener(eventName, handler, element = _window) {
    // Create a ref that stores handler
    const savedHandler = useRef();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler
    // without us needing to pass it in effect deps array and potentially
    // cause effect to re-run every render.

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) {
                return;
            }

            // Create event listener that calls handler function stored in ref
            const eventListener = (event) => {
                let currHandler: any = savedHandler.current;
                if (currHandler) {
                    return currHandler(event);
                }
            };

            // Add event listener
            element.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
}

/**
$(function() {
    // $text = $("#textarea");
    // $sharps = $("#sharps-text");
    // $flats = $("#flats-text");

    loadNoteGroups();
    loadSharpsAndFlats();

    $(document).bind('keyup', function(e) {
        // update our sharps / flats
        if ($sharps.is(":focus")) {
            localStorage.sharps = $sharps.val().toLowerCase();
            return;
        }
        if ($flats.is(":focus")) {
            localStorage.flats = $flats.val().toLowerCase();
            return;
        }
    });

    $(document).bind('keydown', function(e) {
        if ($sharps.is(":focus") || $flats.is(":focus")) {
            return; // if we are typing in the sharps/flats input, we should ignore the rest of the key handler
        }

        if (e.keyCode == 91 || e.keyCode == 93) { // CMD KEY on Mac
            $text.select();
        }

        if (e.metaKey) {
            if (e.keyCode == 88 || e.keyCode == 67) { // CMD + X or CMD + C
                setTimeout(resetData, 100);
            }
            return;
        }

        if (e.altKey) {
            return;
        }

        var sharpModifier = 0;
        if (e.ctrlKey) {
            sharpModifier = -1;
        } else if (e.shiftKey) {
            sharpModifier = +1;
        }

        e.preventDefault();
        switch (e.keyCode) {
            case 192: // ~ == SHIFT + `
                console.log('SHIFT + `');
                resetData();
                break;
            case 27: // ESC
                if (e.shiftKey) {
                    resetData();
                } else {
                    resetOffsets();
                }
                break;
            case 8: // BACKSPACE/DEL
                deleteLastGroup();
                break;
            case 9: // TAB
                mergeLastTwoGroups();
                // TODO: Also support unmerging?
                break;
            case 37: // LEFT
                // shift the keyboard offset to the left by 1
                fretOffset--;
                if (fretOffset < 0) {
                    fretOffset = 0;
                }
                drawGuitar();
                break;
            case 39: // RIGHT
                // shift the keyboard offset to the right by 1
                fretOffset++;
                if (fretOffset > 3) {
                    fretOffset = 3;
                }
                drawGuitar();
                break;
            case 38: // UP
                // shift the keyboard offset up by 1
                stringOffset--;
                if (stringOffset < 0) {
                    stringOffset = 0;
                }
                drawGuitar();
                break;
            case 40: // DOWN
                // shift the keyboard offset down by 1
                stringOffset++;
                if (stringOffset > 2) {
                    stringOffset = 2;
                }
                drawGuitar();
                break;
            default:
                play(e.keyCode, sharpModifier);
                break;
        }
    });

    drawGuitar();
});

 
 */
