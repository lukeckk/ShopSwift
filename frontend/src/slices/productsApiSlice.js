// this does not creates 'product' on redux dev tool like 'auth' and 'cart' because it is with its parent 'api' slice

import { PRODUCTS_URL } from "../constants";
// use apiSlice instead of createSlice as the endpoints are async
import { apiSlice } from "./apiSlice";

// this is the children api slice
// to insert builder into query
export const productsApiSlice = apiSlice.injectEndpoints({

  // builder has method for query
  // this query will replace the fetch request to backend in HomeScreen.jsx
  endpoints: (builder) => ({
    // get products
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      // keep data for 5 sec
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
    })
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;