// TODO: Figure out how to import this in Next.js
// For now, just stick it in the public/ directory.

// a timer loop to drive our MIDI playback
// use this instead of requestAnimationFrame so that we can have it play in a background tab.

let isRunning = false;
let interval = null;
let delay = 10; // ms between ticks

self.addEventListener("message", (e) => {
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
