import * as i from 'types';
import * as React from 'react';

import { getUser } from 'queries/example';
import { useRouter } from 'hooks';

import Layout from 'layouts/Layout';

/**
 * CSR (client-side rendering) renders the page on the client (the browser)
 * https://www.patterns.dev/posts/client-side-rendering/
 */
const Page: i.NextPageComponent = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { query } = useRouter<Queries>();
  const { data, status } = getUser(query.userId).client();

  // using isServer is not enough to render only on client and prevent hydration issues
  // This way it is guaranteed to only render on client-side without issues
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <p>This page is to show how to use SSR.</p>
      {status !== 'success' ? 'Loading...' : (
        <>
          data: <pre>{JSON.stringify(data, null, 2)}</pre>
          query: <pre>{JSON.stringify(query)}</pre>
        </>
      )}
    </>
  );
};

Page.layout = (page) => {
  return (
    <Layout>{page}</Layout>
  );
};

type Queries = {
  userId: string;
};

export default Page;
