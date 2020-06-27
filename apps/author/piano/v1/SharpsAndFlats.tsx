import React, { useEffect, useState } from "react";

export default () => {
    return (
        <>
            <div>
                sharps: <input id="sharps-text" />
                <br />
                flats: <input id="flats-text" />
            </div>
            <style jsx>{`
                div {
                    float: left;
                    margin-right: 20px;
                    text-align: right;
                }
                input {
                    width: 150px;
                }
            `}</style>
        </>
    );
};
