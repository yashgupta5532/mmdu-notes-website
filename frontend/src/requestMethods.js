import axios from "axios";

// const BASE_URL="http://52.66.241.163:4000/api/";
const BASE_URL=process.env.REACT_APP_FRONTEND_URL;


console.log(BASE_URL)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
