import type * as i from 'types';
import {
  GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType,
} from 'next';

import { useRouter } from 'hooks';

import PrimeLayout from 'layouts/PrimeLayout';

/**
 * iSSG (incremental static site generation) is a mix of SSG and SSR
 * You can specify the known paths during build-time, and any new paths will be built on the server
 * and live as static paths from there on
 *
 * https://www.patterns.dev/posts/incremental-static-rendering/
 */
const Page: i.NextPageComponent<Props> = ({ params }) => {
  const router = useRouter<Queries>();

  return (
    <>
      <p>This page is to show how to use iSSG.</p>
      {/* Show a loader while the page is being built and rendered */}
      {router.isFallback ? <div>Loading...</div> : (
        <div>
          params: <pre>{JSON.stringify(params)}</pre>
        </div>
      )}
    </>
  );
};

Page.layout = (page) => {
  return (
    <PrimeLayout>{page}</PrimeLayout>
  );
};

/**
 * Generate all the (known) static paths for this route during build-time
 */
export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    // If a path is loaded that is not /1 or /2 (i.e. /3) then it will be built run-time
    // and from there on it will be a static page like /1 and /2
    fallback: true,
  };
}


/**
 * Get data from the backend during build-time
 */
export async function getStaticProps(ctx: GetStaticPropsContext<Queries>) {
  return {
    props: {
      params: ctx.params!,
    },
    // Revalidate the page's data every 5 minutes
    revalidate: 300,
  };
}

type Queries = {
  id: string;
};

// We can infer the prop type from the function
// This requires the "function functionName" syntax. "const functionName" syntax will not work!
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default Page;
