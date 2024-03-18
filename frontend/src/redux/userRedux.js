import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    searchedValue: null,
    profilePicture: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateProfilePicture: (state, action) => {
      state.profilePicture = action.payload; // Update profilePicture with the new URL
    },
    search: (state, action) => {
      state.searchedValue = action.payload;
    },
    follow: (state, action) => {
      state.currentUser.followings = [
        ...state.currentUser.followings,
        action.payload,
      ];
    },
    unFollow: (state, action) => {
      state.currentUser.followings = state.currentUser.followings.filter(
        (following) => following !== action.payload
      );
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfilePicture,
  search,
  follow,
  unFollow,
  clearErrors,
} = userSlice.actions;
export default userSlice.reducer;
