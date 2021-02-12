import AppContainer from "apps/author/guitar/v1/AppContainer";

const Page = () => {
    return <AppContainer />;
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "Guitar Author V1",
        },
    };
}
