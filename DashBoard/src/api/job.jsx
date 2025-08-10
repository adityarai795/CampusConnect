import API from "./api";

export const showall = () => API.get('/job/showall/');

export const createJob = (inputData) => API.post("/job/addJob", inputData); 

export const deleteJob = (inputData) => API.delete(`/job/deletePost/${inputData}`);