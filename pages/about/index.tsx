const Page = ({ title, build_date }) => {
    return (
        <>
            <h1>About</h1>
            <div>Everything on this website is MIT licensed, so have fun exploring!</div>
            <div>
                The website is built using Next.js. The code can be found <a href="//github.com/squarepoet/squarepoet.github.io/tree/next-js-src">at this repository</a>.
                <br />
                The static website is hosted on <a href="//github.com/squarepoet/squarepoet.github.io">GitHub Pages</a>.
            </div>
            <div>Build Date: {build_date}</div>
        </>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "About",
            build_date: new Date().toISOString(),
        },
    };
}
