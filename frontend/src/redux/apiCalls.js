import {
  registerFailure,
  registerStart,
  registerSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  clearErrors,
} from "./userRedux";
import axios from "axios";
import { publicRequest } from "../requestMethods";

const apiInstance = axios.create({
  baseURL: "http://studywithmaterial.com:4000/api/",
  headers: {
    // Include any authentication headers or other common headers here
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN", // Include your access token if required
  },
});

export const login = async (dispatch, userCredentials) => {
  try {
    const response = await apiInstance.post("/auth/login", userCredentials);
    const user = response.data;

    // Assuming your API returns some data when login is successful
    if (user) {
      // Dispatch a success action if login is successful
      dispatch(loginSuccess(user));
      return user; // Return the user data
    } else {
      // If login fails (e.g., incorrect email or password), throw an error
      throw new Error("Login failed. Please check your credentials.");
    }
  } catch (error) {
    // Handle any network errors or other issues here
    throw error; // Re-throw the error so that it can be caught in your component
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
    dispatch(clearErrors());
  }
};

export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";

// Action creators
export const updateProfilePicture = (newProfilePicture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: newProfilePicture,
});
