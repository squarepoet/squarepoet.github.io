import React, { useEffect, useState } from "react";

type SpacerProps = {
    width: number;
};

const Spacer = ({ width }: SpacerProps) => {
    return (
        <>
            <div>&nbsp;</div>
            <style jsx>{`
                div {
                    display: inline-block;
                    min-width: ${width}px;
                }
            `}</style>
        </>
    );
};

const Spacer20px = () => {
    return <Spacer width={20} />;
};

const Spacer30px = () => {
    return <Spacer width={30} />;
};

export { Spacer20px, Spacer30px };

export default Spacer;
