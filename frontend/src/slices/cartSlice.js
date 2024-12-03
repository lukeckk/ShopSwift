import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// store cart item in local storage 
// check local storage, if there is something, show it as JSON object, else empty
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // reducers contains the necessary functions for the cart (add, remove, etc..)
  reducers: {
    // action includes data payload
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id)

      // checking for existing item and add to cart if any
      if(existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    }
  }
});

// export to store.js
export default cartSlice.reducer;

// export to be used as UI components
export const { addToCart } = cartSlice.actions;