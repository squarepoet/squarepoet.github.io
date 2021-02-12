import AppContainer from "apps/author/guitar/v2/AppContainer";

const Page = () => {
    return <AppContainer />;
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Guitar & Ukulele Author V2",
        },
    };
}
