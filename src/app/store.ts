import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { usersApi } from './api/usersApi';
import { listingsApi } from './api/listingsApi';
import { reservationsApi } from './api/reservationsApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [listingsApi.reducerPath]: listingsApi.reducer,
    [reservationsApi.reducerPath]: reservationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      usersApi.middleware,
      listingsApi.middleware,
      reservationsApi.middleware,
    ]),
});

export default store;
