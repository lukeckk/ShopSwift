import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// to insert builder into query
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // redux for 
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