import axios from "axios";

// const BASE_URL="http://52.66.241.163:4000/api/";
const BASE_URL=process.env.FRONTEND_URL || "http://43.205.159.37/api/";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
// });
