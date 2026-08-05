// api.js
import axios from "axios";

const PRODUCTION_API_URL = "https://mern-wanderlust-4i7c.onrender.com";
const DEVELOPMENT_API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? PRODUCTION_API_URL : DEVELOPMENT_API_URL),
});

export default api;
