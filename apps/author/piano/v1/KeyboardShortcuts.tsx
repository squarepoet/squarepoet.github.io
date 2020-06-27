import { Spacer20px } from "components/spacer";
import React, { useEffect, useState } from "react";

export default () => {
    return (
        <>
            <div>
                shift + esc &rarr; clear <Spacer20px /> cmd + c &rarr; copy
                <br />
                shift &rarr; sharp <Spacer20px /> ctrl &rarr; flat
                <br />
                up/down &rarr; +/- octave <Spacer20px /> tab &rarr; combine
            </div>
            <style jsx>{`
                div {
                    font-size: 14pt;
                    float: right;
                    text-align: right;
                }
            `}</style>
        </>
    );
};
