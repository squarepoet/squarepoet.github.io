import React, { useEffect, useState } from "react";

// Accept some CSS from my parent, for customization purposes.
// float: right | left;

const Page = (props) => {
    return (
        <>
            <div className="sharps-and-flats" style={props.style}>
                <div>
                    sharps: <input id="sharps-text" />
                </div>
                <div>
                    flats: <input id="flats-text" />
                </div>
            </div>
            <style jsx>{`
                div.sharps-and-flats {
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

export default Page;
