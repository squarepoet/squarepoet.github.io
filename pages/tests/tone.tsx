// Test Tone.js

// TODO: Use keyboard input to trigger the attack/release on the current instrument

import React, { useEffect } from "react";
import * as Tone from "tone";

let instruments = [];

const Page = () => {
    function onClickCreateFM(e) {
        const fmSynth = new Tone.FMSynth();
        fmSynth.debug = true;
        fmSynth.connect(Tone.Destination);
        instruments.push(fmSynth);
    }
    function onClickCreateAM(e) {
        const amSynth = new Tone.AMSynth();
        amSynth.harmonicity.value = 2; // Defaults to 3
        amSynth.debug = true;
        amSynth.connect(Tone.Destination);
        instruments.push(amSynth);
    }
    function onClickCreateSampler1(e) {
        const baseURL = "/s/m/grand/";
        const samplesMap = {
            C1: "4.mp3",
            C2: "16.mp3",
            C3: "28.mp3",
            D3: "30.mp3",
            E3: "32.mp3",
            G3: "35.mp3",
            A3: "37.mp3",
            B3: "39.mp3",
            C4: "40.mp3",
            D4: "42.mp3",
            E4: "44.mp3",
            F4: "45.mp3",
            G4: "47.mp3",
            A4: "49.mp3",
            C5: "52.mp3",
            F5: "57.mp3",
            A5: "61.mp3",
            C6: "64.mp3",
            F6: "69.mp3",
            C7: "76.mp3",
            G7: "83.mp3",
            C8: "88.mp3",
        };
        let sampler1;
        const config: any = {
            urls: samplesMap,
            baseUrl: baseURL,
            onload: () => {
                instruments.push(sampler1);
                console.log("Preloaded Sampler 1");
            },
        };
        sampler1 = new Tone.Sampler(config).toDestination();
        sampler1.debug = true;
    }
    function onClickCreateSampler2(e) {
        const baseURL = "/s/m/bright/";
        const samplesMap = {
            C1: "4.mp3",
            G1: "11.mp3",
            C2: "16.mp3",
            G2: "23.mp3",
            C3: "28.mp3",
            G3: "35.mp3",
            C4: "40.mp3",
            G4: "47.mp3",
            C5: "52.mp3",
            G5: "59.mp3",
            C6: "64.mp3",
            G6: "71.mp3",
            C7: "76.mp3",
            G7: "83.mp3",
            C8: "88.mp3",
        };
        let sampler2;
        const config: any = {
            urls: samplesMap,
            baseUrl: baseURL,
            onload: () => {
                instruments.push(sampler2);
                console.log("Preloaded Sampler 2");
            },
        };
        sampler2 = new Tone.Sampler(config).toDestination();
        sampler2.debug = true;
    }
    function onClickPlayNote(e) {
        instruments.forEach((audioNode) => {
            audioNode.triggerAttackRelease("C3", "4n");
        });
    }
    function onClickCheckToneDestination(e) {}
    function onClickDisconnect(e) {
        console.log("Num Inputs " + Tone.Destination.numberOfInputs);
        console.log("Num Outputs " + Tone.Destination.numberOfOutputs);
        instruments.forEach((audioNode) => {
            audioNode.dispose();
        });
        instruments = [];
    }

    function onClickStartTone() {
        Tone.start();
    }

    useEffect(() => {
        // window["t"] = Tone;
        // One Time
    }, []);

    return (
        <div>
            <h1>Tone JS Demo</h1>
            <button onClick={onClickStartTone}>Tone.start</button>
            <br />
            <button onClick={onClickCreateFM}>Connect FM Synth</button>
            <br />
            <button onClick={onClickCreateAM}>Connect AM Synth</button>
            <br />
            <button onClick={onClickCreateSampler1}>Connect Sampler 1</button>
            <br />
            <button onClick={onClickCreateSampler2}>Connect Sampler 2</button>
            <br />
            <button onClick={onClickPlayNote}>Play a Note</button>
            <br />
            <button onClick={onClickCheckToneDestination}>Print Debug Info to Console</button>
            <br />
            <button onClick={onClickDisconnect}>Reset the Destination</button>
            <br />
        </div>
    );
};

export default Page;
