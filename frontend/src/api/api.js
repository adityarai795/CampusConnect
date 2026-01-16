import axios from "axios";

// export const BASE_URL = "http://localhost:3000/"
export const BASE_URL = "https://campusconnectbackend-q596.onrender.com/"


const API = axios.create({
  // baseURL: "https://campusconnectbackend-q596.onrender.com/",
  baseURL: "http://localhost:3000/",
});

export default API; 