import API from "./api";

export const showallProblem = () => API.get("/practice/GetCodingProblem");

export const addProblem = (inputdata) => API.post("/problem/addproblem", inputdata);

export const getprojectIdea = () => API.get("/practice/GetProjectIdeas");

export const interview = () => API.get("/practice/getAllQuestions");