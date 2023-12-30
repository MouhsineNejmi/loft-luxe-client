import {
  IReservation,
  IReservationResponse,
  IReservationWithListing,
  ReservationQuery,
} from '@/types/types';
import { apiSlice } from './api';

export const reservationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query<IReservationWithListing[], ReservationQuery>(
      {
        query(query) {
          console.log(query);

          return {
            url: 'reservations',
            params: query,
            credentials: 'include',
          };
        },
        transformResponse: (result: {
          reservations: IReservationWithListing[];
        }) => result.reservations,
      }
    ),
    createReservation: builder.mutation<IReservationResponse, IReservation>({
      query(data) {
        return {
          url: 'reservations',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (result: { reservation: IReservationResponse }) =>
        result.reservation,
    }),
    cancelReservation: builder.mutation<IReservationResponse, string>({
      query(reservationId) {
        return {
          url: `reservations/${reservationId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      transformResponse: (result: { reservation: IReservationResponse }) =>
        result.reservation,
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useCancelReservationMutation,
} = reservationsApi;
