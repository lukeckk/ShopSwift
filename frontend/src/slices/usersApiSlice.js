// this does not creates 'product' on redux dev tool like 'auth' and 'cart' because it is with its parent 'api' slice

import { USERS_URL } from "../constants";
// use apiSlice instead of createSlice as the endpoints are async
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({

  // builder has method for query
  // this query will replace the fetch request to backend in HomeScreen.jsx
  endpoints: (builder) => ({
    // make a post request
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;