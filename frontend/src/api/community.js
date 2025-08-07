import API from "./api";

export const viewAllPost = () =>API.get("/community/post/viewall");

export const viewOne = (inputData) => API.get(`/community/post/${inputData}`);

export const deletePost = (inputData) => API.delete(`/community/post/${inputData}/delete`);

export const updatePost = (inputData) => API.patch(`/community/post/${inputData}/update`);

export const addPost = () => API.post("/community/post/addPost");

export const addComment = (id, inputData) =>API.post(`/community/addcomment/6891ab28aa8b3b13ca4ced50`, inputData);

export const showallComments = (id) => API.get(`/community/showallPostComments/${id}`);

export const deleteComment = (inputData) =>API.delete(`/community/deleteComment/${inputData}`);
