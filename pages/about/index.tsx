const Page = () => {
    return (
        <>
            <h1>About</h1>
            <div>Everything on this website is MIT licensed, so have fun exploring ⛏️!</div>
            <div>
                <a href="//github.com/squarepoet/squarepoet.github.io/tree/next-js-src">GitHub repository of Next.js project</a>
                <a href="//github.com/squarepoet/squarepoet.github.io">Statically hosted on GitHub Pages</a>
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
