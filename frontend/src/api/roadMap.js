import API from "./api";

export const fetchRoadMap = () => API.get("/roadmap/getAll");

export const fetchRoadMapByField = (field) =>
  API.get(`/roadmap/get/${field}`);

export const searchRoadMap = (query) =>
  API.get(`/roadmap/search`, { params: { q: query } });

