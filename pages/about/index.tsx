export default () => {
    return <div>About</div>;
};

export async function getStaticProps(context) {
    return {
        props: {
            title: "About",
        },
    };
}
