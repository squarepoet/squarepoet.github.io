const Page = () => {
    return (
        <>
            <h1>About</h1>
            <div>Some Fun Experiments!</div>
            <div>
                Everything on this website is MIT licensed, so <a href="//github.com/squarepoet/squarepoet.github.io">have fun exploring</a>.
            </div>
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
