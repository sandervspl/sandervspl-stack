import * as i from 'types';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { getUser } from 'queries/example';

import Layout from 'layouts/Layout';

/**
 * SSR (server-side rendering) dynamically renders the page on every request
 * https://www.patterns.dev/posts/server-side-rendering/
 */
const Page: i.NextPageComponent<Props, Queries> = ({ params }) => {
  const { data } = getUser(params.userId).client();

  return (
    <>
      <p>This page is to show how to use SSR.</p>
      data: <pre>{JSON.stringify(data, null, 2)}</pre>
      params: <pre>{JSON.stringify(params)}</pre>
    </>
  );
};

Page.layout = (page) => {
  return (
    <Layout>{page}</Layout>
  );
};

// NOTE: This function will make this path non-static. For static, use "GetStaticProps"
export async function getServerSideProps(ctx: GetServerSidePropsContext<Queries>) {
  const query = await getUser(ctx.params!.userId).server();

  return {
    props: {
      ...query,
      // Return more stuff from the server
      params: ctx.params!,
    },
  };
}

type Queries = {
  userId: string;
};

// We can infer the prop type from the function
// This requires the "function functionName" syntax. "const functionName" syntax will not work!
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default Page;
