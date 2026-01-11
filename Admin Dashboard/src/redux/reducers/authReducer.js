import { loginUser,logout } from "../action/authAction";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  user: null,
  isAuthentication: false,
  errorMessage: "", // Add error message field
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   state.isLoggedIn = false;
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.errorMessage = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      // Login action
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.errorMessage = action.payload.message || "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isError = true;
      });
      // Get current user action
      // .addCase(getCurrentUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getCurrentUser.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   state.isLoggedIn = true;
      //   state.isLoading = false;
      //   state.isError = false;
      // })
      // .addCase(getCurrentUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.errorMessage = action.payload.message || "Error fetching user";
      // });
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;