import * as Tone from "tone";

export default class Preloader {
    filesToLoad: Tone.Buffer[] = [];

    constructor(files: string[]) {
        for (let file of files) {
            console.log("Preload " + file);
            const buffer = new Tone.Buffer(file, function () {
                // READY
            });
            this.filesToLoad.push(buffer);
        }
    }
}
