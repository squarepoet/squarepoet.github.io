// #TODO: Haven't been able to get workers working properly in Next.js. :-\
//
// a timer loop to drive our MIDI playback
// use this instead of requestAnimationFrame so that we can have it play in a background tab.

let isRunning = false;
let interval = null;
let delay = 10; // ms between ticks

addEventListener("message", (event) => {
    switch (e.data) {
        case "start":
            console.log("Piano Clock Worker Started");
            if (!isRunning) {
                isRunning = true;
                interval = setInterval(function () {
                    postMessage("tick");
                }, delay);
            }
            break;
        case "stop":
        default:
            console.log("Piano Clock Worker Stopped");
            clearInterval(interval);
            isRunning = false;
            break;
    }
});
