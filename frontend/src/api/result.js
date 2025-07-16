import API from "./api";

export const result = (inputData) => API.post("/result/viewResultLink", inputData);