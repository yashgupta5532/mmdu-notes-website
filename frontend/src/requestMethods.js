import axios from "axios";
// const LocalBASE_URL="http://localhost:4000/api/";

const BASE_URL="http://52.66.241.163:4000/api/";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
