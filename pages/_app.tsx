import Layout from "components/Layout";
import { AppProps } from "next/app";

export default ({ Component, pageProps }: AppProps) => {
    console.log("Page Component Props:");
    console.log(pageProps);

    if (!pageProps.title) {
        pageProps.title = "Default Title";
    }

    return (
        <Layout title={pageProps.title}>
            <Component {...pageProps} />
        </Layout>
    );
};
