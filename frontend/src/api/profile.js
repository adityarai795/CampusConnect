import API from "./api";

export const getProfile = () => API.get("/profile/profile_get");