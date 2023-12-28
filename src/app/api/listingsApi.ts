import { IListing, IListingResponse } from '@/types/types';
import { apiSlice } from './api';

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query<IListing[], void>({
      query() {
        return {
          url: 'listings',
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
  }),
});

export const { useGetAllListingsQuery, useAddListingMutation } = listingsApi;
