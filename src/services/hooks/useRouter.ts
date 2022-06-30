import { useRouter as useNextRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';

export const useRouter = <Queries extends ParsedUrlQuery = ParsedUrlQuery>() => {
  const router = useNextRouter();
  const query = router.query as Queries;

  return {
    ...router,
    query,
  };
};
