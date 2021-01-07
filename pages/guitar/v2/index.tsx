import React from "react";

import { Button } from "@material-ui/core";

const Page = () => {
    return (
        <>
            <div>Guitar Author V2</div>
            <Button color="primary">Hello Material UI</Button>
        </>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Guitar Author V2",
        },
    };
}
