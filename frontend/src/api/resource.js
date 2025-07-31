import API from "./api";

export const viewResource = (inputData) => API.post("/resource/viewResource", inputData);

export const showall = () => API.get("/resource/showall");
