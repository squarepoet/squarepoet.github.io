import Piano from "apps/shared/tone/Piano";
import React, { useEffect, useState } from "react";

// A dirt simple piano that uses Tone.js

let piano: Piano;

export default () => {
    useEffect(() => {
        piano = new Piano();
    }, []);

    function startTone() {
        piano.initWebAudio();
    }

    function playPianoNote(keyNumber: number) {
        piano.play(keyNumber);
    }

    function stopPianoNote(keyNumber: number) {
        piano.stop(keyNumber);
    }

    return (
        <div>
            <button onClick={startTone}>Start Tone</button>
            <div>
                <label htmlFor="scales">Choose a scale:</label>{" "}
                <select name="scales" id="scales">
                    <option value="cmajor">C Major</option>
                    <option value="aminor">A Minor</option>
                    <option value="gmajor">G Major</option>
                    <option value="amajor">A Major</option>
                </select>
            </div>
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div onClick={() => playPianoNote(40)}>1</div>
                <div onClick={() => playPianoNote(42)}>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div onClick={() => playPianoNote(51)}>7</div>
                <div onClick={() => stopPianoNote(40)}>1</div>
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
