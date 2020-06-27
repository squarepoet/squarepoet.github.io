import React from "react";

export default () => {
    return <div>Guitar V2</div>;
};

export async function getStaticProps(context) {
    return {
        props: {
            title: "Guitar Author V2",
        },
    };
}
