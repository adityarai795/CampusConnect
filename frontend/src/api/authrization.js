import API from "./api";
// // Option 1: Use plain Axios without auth
// import axios from "axios";

// export const forgetPassword = (inputdata) =>
//   axios.patch("http://localhost:3000/auth/forget-password", inputdata);


export const loginUser = (inputdata) => API.post("/auth/login", inputdata);
export const registerUser = (inputdata) => API.post("/auth/signup", inputdata);
export const logoutUser = () => API.get("/auth/logout");
export const forgetPassword = (inputdata) =>API.patch("/auth/forget-password", inputdata);