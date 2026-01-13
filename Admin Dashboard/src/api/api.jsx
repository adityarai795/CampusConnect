import axios from "axios";

const API = axios.create({
  // baseURL: "https://campusconnectbackend-q596.onrender.com/",
   baseURL: "http://localhost:3000/",
});

export default API;
