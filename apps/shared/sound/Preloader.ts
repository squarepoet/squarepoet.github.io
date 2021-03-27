import { ToneAudioBuffer } from "tone";

export default class Preloader {
    filesToLoad: ToneAudioBuffer[] = [];

    constructor(files: string[]) {
        for (let file of files) {
            const buffer = new ToneAudioBuffer(file, function () {
                console.log("Preloaded " + file);
            });
            this.filesToLoad.push(buffer);
        }
    }
}
