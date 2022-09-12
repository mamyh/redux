import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import filtersSlice from '../features/filters/filtersSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    filters:filtersSlice,
  },
  middleware:(getDefaultMiddlewares)=> getDefaultMiddlewares().concat(apiSlice.middleware)
});
