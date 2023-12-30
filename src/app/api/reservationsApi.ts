import {
  IReservation,
  IReservationResponse,
  ReservationQuery,
} from '@/types/types';
import { apiSlice } from './api';

export const reservationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query<IReservation[], ReservationQuery>({
      query(query) {
        return {
          url: 'reservations',
          params: query,
          credentials: 'include',
        };
      },
      transformResponse: (result: { reservations: IReservation[] }) =>
        result.reservations,
    }),
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
  }),
});

export const { useGetReservationsQuery, useCreateReservationMutation } =
  reservationsApi;
