import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// This is the parent slice as it is fetching from the root
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({})
});