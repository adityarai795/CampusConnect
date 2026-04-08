import API from "./api";

export const showallProblem = () => API.get("/problem/getallProblem");

export const addProblem = (inputdata) => API.post("/problem/addproblem", inputdata);

export const deleteProblem=(inputdata)=>API.delete(`/Problem/deleteProblem/${inputdata}`)