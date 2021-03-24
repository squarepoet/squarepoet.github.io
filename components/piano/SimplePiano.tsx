import Instrument, { InstrumentType } from "apps/shared/sound/Instrument";
import React, { useEffect, useState } from "react";

// #TODO: Fix or delete this!
// A dirt simple piano that uses Tone.js

let piano: Instrument;
let notesPlaying = new Set();

const SimplePiano = () => {
    useEffect(() => {
        // MOUNT
    }, []);

    function startTone() {
        piano = new Instrument(InstrumentType.Basic);
    }

    function playPianoNote(keyNumber: number) {
        piano.play(keyNumber);
        notesPlaying.add(keyNumber);
    }

    function stopPianoNote(keyNumber: number) {
        piano.stop(keyNumber);
        notesPlaying.delete(keyNumber);
    }

    function stopSounds() {
        for (let keyNumber of notesPlaying) {
            piano.stop(keyNumber as number);
        }
        notesPlaying.clear();
    }

    return (
        <div>
            <button onClick={startTone}>Start Tone</button>
            <br></br>
            <button onClick={stopSounds}>Stop Piano Sounds</button>
            <div>
                <label htmlFor="scales">Choose a scale:</label>{" "}
                <select name="scales" id="scales">
                    <option value="cmajor">C Major</option>
                    <option value="aminor">A Minor</option>
                    <option value="gmajor">G Major</option>
                    <option value="amajor">A Major</option>
                </select>
            </div>
            <div onClick={stopSounds}>STOP ALL SOUNDS</div>
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div onClick={() => playPianoNote(40)}>C</div>
                <div onClick={() => playPianoNote(42)}>D</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div onClick={() => playPianoNote(51)}>B</div>
                <div onClick={() => playPianoNote(52)}>C</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
            </div>
        </div>
    );
};

export default SimplePiano;
