import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "https://api.collegeconnect.me/"
    : "https://api.collegeconnect.me/"; // your PC IP for mobile

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
