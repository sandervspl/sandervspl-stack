import type { ParsedUrlQuery } from 'querystring';
import { useRouter as useNextRouter } from 'next/router';

export const useRouter = <Queries extends ParsedUrlQuery = ParsedUrlQuery>() => {
  const router = useNextRouter();
  const query = router.query as Queries;

  return {
    ...router,
    query,
  };
};
