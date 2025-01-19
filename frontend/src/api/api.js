import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:5000", //won't work if it is 127.0.0.1
  baseURL: import.meta.env.VITE_BACKEND_API, // Match the backend's CORS origin
  withCredentials: true,
});

export default api;
