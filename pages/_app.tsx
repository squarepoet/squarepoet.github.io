import { AppProps } from "next/app";
import Layout from "components/layout";

export default ({ Component, pageProps }: AppProps) => {
    console.log("Page Component Props:");
    console.log(pageProps);

    if (!pageProps.title) {
        pageProps.title = "Default Title";
    }

    return (
        <>
            <Layout title={pageProps.title}>
                <Component {...pageProps} />
            </Layout>
            <style jsx global>{`
                html,
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
                        "Segoe UI Emoji", "Segoe UI Symbol";
                    background-color: #232323;
                    color: #bbb;
                    font-size: 16pt;
                    line-height: 150%;
                }
            `}</style>
        </>
    );
};
