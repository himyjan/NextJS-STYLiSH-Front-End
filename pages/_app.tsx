import Layout from '@/components/Layout/Layout';
import Head from 'next/head';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import { AuthContextProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Provider store={store}>
          <Head>
            <title>STYLiSH</title>
            <meta
              name="description"
              content="STYLiSH, One of best clothing shopping site in world."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </AuthContextProvider>
    </>
  );
}
