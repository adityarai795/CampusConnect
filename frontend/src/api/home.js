import api from "./api";

export const getHomePageData = () => api.get("/home/homepagedata");