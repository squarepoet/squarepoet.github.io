import AppContainer from "apps/author/piano/v1/AppContainer";

const Page = () => {
    return <AppContainer />;
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Piano Author V1",
        },
    };
}
