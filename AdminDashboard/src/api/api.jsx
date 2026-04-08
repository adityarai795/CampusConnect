import axios from "axios";

const API = axios.create({
  baseURL: "https://api.collegeconnect.me/",
  // baseURL: "http://localhost:3000/",
});

export default API;
