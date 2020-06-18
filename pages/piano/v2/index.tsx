import * as React from "react";

export default () => {
    return <div>Piano V2</div>;
};

export async function getStaticProps(context) {
    return {
        props: {
            title: "Piano Author V2",
        },
    };
}
