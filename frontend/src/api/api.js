import axios from "axios";

const DEV_BASE_URL = "http://localhost:3000/";
const PROD_HTTPS_BASE_URL = "https://campusconnectbackend-q596.onrender.com/";
const PROD_HTTP_BASE_URL = "http://13.203.2.23:3000/";

const isHttpsPage =
  typeof window !== "undefined" && window.location.protocol === "https:";

export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? isHttpsPage
      ? PROD_HTTPS_BASE_URL
      : PROD_HTTP_BASE_URL
    : DEV_BASE_URL);

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
