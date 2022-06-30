import * as i from 'types';
import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { withTRPC } from '@trpc/next';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.css';
import { AppRouter } from './api/trpc/[trpc]';

const App: React.FC<Props> = ({ Component, pageProps: { state, ...pageProps } }) => {
  const getLayout = Component.layout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="192x192" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools position="bottom-right" />
    </>
  );
};

type Props = Omit<AppProps, 'pageProps'> & {
  pageProps: i.AnyObject;
  Component: i.NextPageComponent;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      // https://react-query.tanstack.com/reference/QueryClient
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  // https://trpc.io/docs/ssr
  ssr: true,
})(App);
