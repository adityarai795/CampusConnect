import API from "./api";

export const showall = (page) => API.get(`/job/showall?page=${page}`);

export const applyJob = (id, data) =>
  API.post(`/job/applyJob/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const myAppliedJobs = () =>
  API.get("/job/myApplications", {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const searchJobs = (search, jobType, category) =>
  API.get(`/job/searchJobs?search=${search}&jobType=${jobType}&category=${category}`);