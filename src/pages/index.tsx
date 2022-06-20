import * as i from 'types';

import Layout from 'layouts/Layout';
import { trpc } from 'hooks/trpc';

const Home: i.NextPageComponent = () => {
  const { data } = trpc.useQuery(['hello', { text: 'world!' }]);

  if (data == null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        Created and maintained by
        <a href="https://github.com/sandervspl"> @sandervspl </a>

        <p>{data.greeting}</p>
      </div>
    </>
  );
};

// This pattern makes it possible to create layouts which only mount once. Useful for sidebars etc.
// You should only see a single "Layout mounted!" log in the console.
// This is a similar pattern to wrapping a layout around routes with react-router
Home.layout = (page) => {
  return (
    <Layout>{page}</Layout>
  );
};

export default Home;
