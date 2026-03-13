import axios from "axios";

const DEV_BASE_URL = "http://localhost:3000/";
const PROD_BASE_URL = "https://api.collegeconnect.me/";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;

const API = axios.create({
  // baseURL: BASE_URL,
  baseURL: "https://api.collegeconnect.me/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
