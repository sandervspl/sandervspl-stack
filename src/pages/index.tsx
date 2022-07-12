import * as i from 'types';
import * as react from 'react';

import { isServer } from 'services';
import { useRouter, trpc } from 'hooks';
import * as queries from 'queries';
import globals from 'styles/globals.css';
import Layout from 'layouts/Layout';

import * as _app from './_app';

const Home: i.NextPageComponent = () => {
  const { data } = trpc.useQuery(['hello', { text: 'world!' }]);

  return (
    <div className="prose mx-auto mt-[20vw]">
      <h1>Sandervspl Stack</h1>
      Created and maintained by <a href="https://github.com/sandervspl">@sandervspl </a>
      <p>tRPC: {data == null ? 'Loading...' : data.greeting}</p>
    </div>
  );
};

Home.layout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
