import * as i from 'types';

import { trpc } from 'hooks/trpc';
import Layout from 'layouts/Layout';

const Home: i.NextPageComponent = () => {
  const { data } = trpc.useQuery(['hello', { text: 'world!' }]);

  if (data == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="prose mx-auto mt-[20vw]">
      <h1>Sandervspl Stack</h1>
      Created and maintained by <a href="https://github.com/sandervspl">@sandervspl </a>
      <p>TRPC: {data.greeting}</p>
    </div>
  );
};

Home.layout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
