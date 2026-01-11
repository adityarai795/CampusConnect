import API from "./api";

export const viewResultLink = (inputData) =>
  API.post("/result/viewResultLink", inputData);

export const addResult = (inputData) => API.post("/result/uploadResultLink", inputData);

export const showall = () => API.get("/result/showall");

export const deleteLink = (inputData) => API.delete(`/result/deleteLink/${inputData}`);