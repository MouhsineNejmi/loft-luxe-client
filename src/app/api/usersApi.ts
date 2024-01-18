import { IUser } from "../../types/types";
import { apiSlice } from "./api";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUser, void>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (result: { user: IUser }) => result.user,
    }),
    addListingToFavorites: builder.mutation<IUser, string>({
      query(listingId) {
        return {
          url: `users/favorites/${listingId}`,
          method: "POST",
          credentials: "include",
        };
      },
      transformResponse: (result: { user: IUser }) => result.user,
    }),
    removeListingFromFavorites: builder.mutation<IUser, string>({
      query(listingId) {
        return {
          url: `users/favorites/${listingId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      transformResponse: (result: { user: IUser }) => result.user,
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useAddListingToFavoritesMutation,
  useRemoveListingFromFavoritesMutation,
} = usersApi;
