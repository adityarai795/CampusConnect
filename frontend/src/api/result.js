import API from "./api";

export const viewResultLink = (inputData) =>
  API.post("/result/viewResultLink", inputData);