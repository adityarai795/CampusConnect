import API from "./api";

export const getProfile = () =>
  API.get("/profile/profile_get", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateProfile = (profileData) =>
  API.patch("/profile/profile_update", profileData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
