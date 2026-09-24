import { createSlice } from "@reduxjs/toolkit";

// Get existing user from localStorage
const storedUser = JSON.parse(localStorage.getItem("user") || "null");

// Get existing token from localStorage
const storedToken = localStorage.getItem("access_token");

const initialState = {
  user: storedUser,
  token: storedToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // Login
    login: (state, action) => {
      const { accessToken, refreshToken, userData } = action.payload;

      // Redux state
      state.token = accessToken;
      state.user = userData;

      // LocalStorage
      localStorage.setItem("access_token", accessToken);

      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }

      localStorage.setItem("user", JSON.stringify(userData));
    },

    // Logout
    logout: (state) => {
      // Redux state
      state.token = null;
      state.user = null;

      // LocalStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
