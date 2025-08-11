import API from "./api";

export const showallProblem = () => API.get("/problem/getallProblem");

export const addProblem = (inputdata) => API.post("/problem/addproblem",inputdata);