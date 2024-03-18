import axios from "axios";

console.log("base url is ",process.env.REACT_APP_FRONTEND_URL)
const BASE_URL=process.env.REACT_APP_FRONTEND_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
