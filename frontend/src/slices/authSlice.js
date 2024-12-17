// this creates 'auth' on redux dev tool

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get userinfo from local storagae in json form if there is any
  userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      // set userInfo to null (JWT or redux? )
      state.userInfo = null;
      // remove from localStorage
      localStorage.removeItem('userInfo');
    }
  }
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;