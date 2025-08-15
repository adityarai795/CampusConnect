import API from "./api";

export const viewAllPost = () =>API.get("/community/post/viewall");

export const viewOne = (inputData) => API.get(`/community/post/${inputData}`);

export const deletePost = (inputData,config) => API.delete(`/community/post/${inputData}/delete`,config);

export const updatePost = (inputData, config) => API.patch(`/community/post/${inputData}/update`, config);

export const addPost = (data, config) =>
  API.post("/community/post/addPost", data, config);


export const addComment = (id, inputData, config) =>
  API.post(`/community/addcomment/${id}`, inputData, config);

export const showallComments = (id) => API.get(`/community/showallPostComments/${id}`);

export const deleteComment = (inputData,config) =>API.delete(`/community/deleteComment/${inputData}`,config);
