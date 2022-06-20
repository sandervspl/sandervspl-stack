import * as i from 'types';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { getUser } from 'queries/example';

import Layout from 'layouts/Layout';

const userId = '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1';

/**
 * SSG (static site generation) is like Gatsby: it will generate a static page during build-time
 * and serve the static file on every request.
 * You can tell Next to revalidate this page's data every x seconds in getStaticProps and build an
 * up-to-date page
 * https://www.patterns.dev/posts/static-rendering/
 */
const Page: i.NextPageComponent<Props> = () => {
  const { data } = getUser(userId).client();

  return (
    <>
      <p>This page is to show how to use SSG.</p>
      data: <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

Page.layout = (page) => {
  return (
    <Layout>{page}</Layout>
  );
};

/**
 * Get data from the backend during build-time
 */
export async function getStaticProps(ctx: GetStaticPropsContext) {
  const query = await getUser(userId).server();

  return {
    props: {
      ...query,
    },
    // Revalidate the page's data every 5 minutes
    revalidate: 300,
  };
}

// We can infer the prop type from the function
// This requires the "function functionName" syntax. "const functionName" syntax will not work!
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default Page;
