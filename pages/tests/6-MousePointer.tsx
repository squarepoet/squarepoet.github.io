import Head from "next/head";
import React, { useEffect, useState } from "react";

// TODO
// Detect whether the user has a mouse, or is on a mobile device, via CSS media queries.

const Page = () => {
    useEffect(() => {
        if (window.matchMedia("(pointer: fine)").matches) {
            console.log("FINE => MOUSE POINTER");
        } else if (window.matchMedia("(pointer: coarse)").matches) {
            console.log("COARSE => TOUCH POINTER");
        } else if (window.matchMedia("(pointer: none)").matches) {
            console.log("NO POINTER!");
        }

        if (window.matchMedia("(any-hover: hover)").matches) {
            console.log("HOVER IS AVAILABLE");
        } else {
            console.log("HOVER IS NOT POSSIBLE");
        }
    }, []);
    return (
        <>
            <div>SEE THE CONSOLE</div>
            <style jsx>{`
                /* The primary input mechanism of the device includes a 
                pointing device of limited accuracy. */
                @media (pointer: coarse) {
                }

                /* The primary input mechanism of the device 
                includes an accurate pointing device. */
                @media (pointer: fine) {
                }

                /* The primary input mechanism of the 
                device does not include a pointing device. */
                @media (pointer: none) {
                }

                /* Primary input mechanism system can 
                hover over elements with ease */
                @media (hover: hover) {
                }

                /* Primary input mechanism cannot hover 
                at all or cannot conveniently hover 
                (e.g., many mobile devices emulate hovering
                when the user performs an inconvenient long tap), 
                or there is no primary pointing input mechanism */
                @media (hover: none) {
                }

                /* One or more available input mechanism(s) 
                can hover over elements with ease */
                @media (any-hover: hover) {
                }

                /* One or more available input mechanism(s) cannot 
                hover (or there are no pointing input mechanisms) */
                @media (any-hover: none) {
                }
            `}</style>
        </>
    );
};

export default Page;
