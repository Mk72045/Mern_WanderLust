import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // tell backend or browser to allows cookies to cross origin
});

export default api;
