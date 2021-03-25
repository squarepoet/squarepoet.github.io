const Page = () => {
    return (
        <>
            <h1>About</h1>
            <div>Some Fun Experiments!</div>
        </>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "About",
        },
    };
}
