import API from "./api";

export const loginUser = (inputdata) => API.post("/auth/login", inputdata);
export const registerUser = (inputdata) => API.post("/auth/signup", inputdata);
export const logoutUser = () => API.post("/auth/logout");
export const forgetPassword = (inputdata) =>
  API.patch("/auth/forget-password", inputdata);
export const getuser = () => API.get("/auth/getuser");

// 🆕 Google Auth
export const googleAuth = (token) => API.post("/auth/google", { token });

// 🆕 Refresh Token
export const refreshAccessToken = (refreshToken) =>
  API.post("/auth/refresh-token", { refreshToken });
