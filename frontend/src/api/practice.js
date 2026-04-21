import api from "./api";

export const getQuizByTopic = async (topic) => {
  try {
    const response = await api.get(
      `/practice/GetQuizQuestionByCategory/${topic}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

export const submitQuizAnswers = async (topic, answers) => {
  try {
    const response = await api.post(`/quiz/${topic}/submit`, { answers });
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz answers:", error);
    throw error;
  }
};