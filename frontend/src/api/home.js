import api from "./api";

export const getHomePageData = () => api.get("/home/homepagedata");

export const submitContactForm = (contactData) => api.post("/home/contact", contactData);

export const subscribeEmailFunction = (emailData) => api.post("/home/subscribe", emailData);