import API from "./api";

export const viewResource = (inputData) => API.post("/resource/viewResource", inputData);

export const showall = (page) => API.get(`/resource/showall?page=${page}&limit=20`);
