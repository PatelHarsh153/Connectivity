// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const initialState = {
//   userInfo: null,
//   loading: false,
//   error: "",
// };
// export const fetchUserData = createAsyncThunk("user/fetchData", () => {
//   return axios
//     .post("http://localhost:3001/analytics/dashboard")
//     .then((response) => {
//       response.data;
//     });
// });

// const authSlice = createSlice({
//   initialState,
//   name: "user",
//   extraReducers: (builder) => {
//     builder.addCase(fetchUserData.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchUserData.fulfilled, (state, action) => {
//       state.loading = false;
//       state.userInfo = action.payload;
//       state.error = "";
//     });
//     builder.addCase(fetchUserData.rejected, (state, action) => {
//       state.loading = false;
//       state.users = [];
//       state.error = action.error.message;
//     });
//   },
// });
// export default authSlice.reducer;
