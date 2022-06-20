import * as i from 'types';
import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { type DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalStyle from 'styles';
import theme from 'styles/theme';

import '../styles/globals.css';

const App: React.VFC<Props> = ({ Component, pageProps: { state, ...pageProps } }) => {
  // This ensures that data is not shared between different users and requests,
  // while still only creating the QueryClient once per component lifecycle.
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds
        cacheTime: 1000 * 6 * 10, // 10 minutes
        retry: false,
        notifyOnChangeProps: 'tracked',
      },
    },
  }));

  const getLayout = Component.layout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="192x192" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={state}>
            {getLayout(<Component {...pageProps} />)}
          </Hydrate>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

type Props = Omit<AppProps, 'pageProps'> & {
  pageProps: i.AnyObject & {
    state: DehydratedState;
  };
  Component: i.NextPageComponent;
};

export default App;
