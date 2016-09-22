// a timer loop to drive our MIDI playback
// use this instead of requestAnimationFrame so that we can have it play in a background tab.

var isRunning = false;
var interval = null;
var delay = 10; // ms between ticks

onmessage = function (e) {
    switch (e.data) {
        case 'start':
            if (!isRunning) {
                isRunning = true;
                interval = setInterval(function () {
                    postMessage('tick');
                }, delay);
            }
            break;
        case 'stop':
        default:
            clearInterval(interval);
            isRunning = false;
            break;
    }
};