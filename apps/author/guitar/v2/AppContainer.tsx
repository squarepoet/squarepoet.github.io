import SharpsAndFlats from "apps/author/piano/shared/SharpsAndFlats";
import React, { useRef } from "react";

const Page = () => {
    const sharpsAndFlatsInput = useRef();

    return (
        <>
            <div>Hello V2</div>
            <SharpsAndFlats ref={sharpsAndFlatsInput} localStorageKeyPrefix="guitar" style={{ float: "left" }} />
        </>
    );
};

export default Page;
