import React from "react";

const Page = () => {
    return <div>Guitar Author V2</div>;
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Guitar Author V2",
        },
    };
}
