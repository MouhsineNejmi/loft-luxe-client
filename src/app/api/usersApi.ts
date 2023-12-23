import { IUser } from '../../types/types';
import { apiSlice } from './api';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUser, void>({
      query() {
        return {
          url: 'users/me',
          credentials: 'include',
        };
      },
      transformResponse: (result: { user: IUser }) => result.user,
    }),
  }),
});

export const { useGetCurrentUserQuery } = usersApi;
