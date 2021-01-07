export default class Preloader {
    context: AudioContext;
    filesToLoad: string[];

    constructor(files: string[]) {
        this.context = new AudioContext();
        this.filesToLoad = files;

        for (let i = 0; i < this.filesToLoad.length; i++) {
            this.load(this.filesToLoad[i]);
        }
    }

    load(url) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = () => {
            this.context.decodeAudioData(
                request.response,
                (buffer) => {
                    console.log("Loaded Buffer " + url);
                    console.log(buffer);
                },
                (e) => {
                    console.log("Failed to Decode Buffer " + url);
                }
            );
        };
        request.onerror = () => {
            console.log("Failed to Load URL " + url);
        };
        console.log("Requesting " + url);
        request.send();
    }
}
