import AppContainer from "apps/midi/AppContainer";
import React from "react";

const Page = () => {
    return <AppContainer />;
};

export async function getStaticProps(context) {
    return {
        props: {
            title: "MIDI Tests",
        },
    };
}

export default Page;
