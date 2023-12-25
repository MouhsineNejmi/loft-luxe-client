import { IListing, IListingResponse } from '@/types/types';
import { apiSlice } from './api';

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useAddListingMutation } = listingsApi;
