import { createSlice } from "@reduxjs/toolkit";

// store cart item in local storage 
// check local storage, if there is something, show it as JSON object, else empty
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};

// add 2 decimals to the price
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}

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

      // Calculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      // Calculate shipping price (free for order over $100, else $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (15%)
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

      // Calculate total price
      state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

      // save all price to local storage as 'cart'
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
});

// export to store.js
export default cartSlice.reducer;

// export to be used as UI components
export const { addToCart } = cartSlice.actions;