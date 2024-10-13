import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

// exmaple for redux
const store = configureStore({
  // boiler plate. one time code to set up redux
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;