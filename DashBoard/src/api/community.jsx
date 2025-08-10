import API from "./api";

export const viewAllPost = () =>API.get("/community/post/viewall");

export const viewOne = (inputData) => API.get(`/community/post/${inputData}`);

export const deletePost = (inputData) => API.delete(`/community/post/${inputData}/delete`);

export const updatePost = (inputData) => API.patch(`/community/post/${inputData}/update`);

export const addPost = () => API.post("/community/post/addPost");