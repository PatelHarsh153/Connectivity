import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
