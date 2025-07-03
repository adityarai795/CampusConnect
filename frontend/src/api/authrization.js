import API from "./api";

export const loginUser = (inputdata) => API.post("/auth/login", inputdata);
export const registerUser = (inputdata) => API.post("/auth/signup", inputdata);
export const logoutUser = () => API.get("/auth/logout");
export const forgetPassword=(inputdata)=>API.patch("/auth/forget-password",inputdata)