import axios from "axios";
// const LocalBASE_URL="http://localhost:4000/api/";

const BASE_URL="http://localhost:4000/api/";

// const BASE_URL = "https://notesharingbackend-ankitkr437.onrender.com/api/";

export const pf="https://notesharingbackend-ankitkr437.onrender.com/images";
// export const pf="https://drive.google.com/drive/my-drive/"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
