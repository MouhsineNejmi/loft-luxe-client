import { IListing, IListingResponse } from '@/types/types';
import { apiSlice } from './api';

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllListings: builder.query<IListing[], any>({
      query(query) {
        return {
          url: 'listings',
          params: query,
          credentials: 'include',
        };
      },
      transformResponse: (result: { listings: IListing[] }) => result.listings,
    }),
    getListingById: builder.query<IListing, string>({
      query(listingId) {
        return {
          url: `listings/${listingId}`,
        };
      },
      transformResponse: (result: { listing: IListing }) => result.listing,
    }),
    getFavoriteListings: builder.query<IListing[], void>({
      query() {
        return {
          url: 'listings/favorites',
          credentials: 'include',
        };
      },
      transformResponse: (result: { listings: IListing[] }) => result.listings,
    }),
    addListing: builder.mutation<IListingResponse, IListing>({
      query(data) {
        return {
          url: 'listings',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (result: { listing: IListingResponse }) =>
        result.listing,
    }),
    deleteListing: builder.mutation<IListingResponse, string>({
      query(listingId) {
        return {
          url: `listings/${listingId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      transformResponse: (result: { listing: IListingResponse }) =>
        result.listing,
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useGetListingByIdQuery,
  useGetFavoriteListingsQuery,
  useDeleteListingMutation,
  useAddListingMutation,
} = listingsApi;
