const Page = () => {
    return <div>About</div>;
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "About",
        },
    };
}
