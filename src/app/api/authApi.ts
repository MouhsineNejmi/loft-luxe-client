import {
  IAuthResponse,
  IGenericResponse,
  ILoginMutateUser,
  IRegisterMutateUser,
} from '../../types/types';
import { apiSlice } from './api';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<IAuthResponse, IRegisterMutateUser>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { user: IAuthResponse }) => result.user,
    }),
    loginUser: builder.mutation<IAuthResponse, ILoginMutateUser>({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    logoutUser: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: 'auth/logout',
          method: 'POST',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useLogoutUserMutation,
} = authApi;
