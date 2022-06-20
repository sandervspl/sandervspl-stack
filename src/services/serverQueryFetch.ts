import * as i from 'types';
import { dehydrate, QueryClient, QueryKey } from 'react-query';

export const serverQueryFetch = async <Fn extends i.AnyFn>(key: QueryKey, fetchFn: Fn) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(key, fetchFn);

  return {
    state: dehydrate(queryClient),
  };
};
