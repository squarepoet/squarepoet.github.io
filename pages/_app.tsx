import { useStore } from "apps/shared/redux/Store";
import Layout from "components/Layout";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => {
    console.log("Props:");
    console.log(pageProps);

    if (!pageProps.title) {
        pageProps.title = "Default Title";
    }

    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Layout title={pageProps.title}>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

export default App;
