import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";
import { AuthContextProvider } from "@/context/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </AuthContextProvider>
    </>
  );
}
