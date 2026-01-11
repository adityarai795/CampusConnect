const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";
// 
import axios from "axios";

const api=axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}
);

export default api;