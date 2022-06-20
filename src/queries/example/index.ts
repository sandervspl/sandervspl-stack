import * as i from 'types';
import { useMutation, useQueryClient, useQuery as _useQuery } from 'react-query';
import { serverQueryFetch } from 'services';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: i.DataPayload) => await new Promise<i.Data>((resolve) => {
      setTimeout(() => {
        resolve({
          id: '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1',
          ...data,
        });
      }, 1000);
    }),
    {
      onSuccess: (data: i.Data) => {
        queryClient.invalidateQueries(['user', data.id]);
        queryClient.setQueryData(['user', data.id], data);
      },
    },
  );
};

export const getUser = (userId: string) => {
  const key = ['user', userId];
  const fetcher = (): Promise<i.Data> => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
      });
    }, 1000);
  });

  return {
    // Renamed to _useQuery to prevent eslint from complaining about calling hooks in non-react component
    client: () => _useQuery<i.Data>(key, fetcher, {
      enabled: Boolean(userId),
    }),
    server: () => serverQueryFetch(key, fetcher),
  };
};
