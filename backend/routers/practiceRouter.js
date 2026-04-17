const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  addCodingProblem,
  getCodingProblem,
  updateCodingProblem,
  deleteCodingProblem,
  updateQuizQuestion,
  addQuizQuestion,
  getQuizQuestions,
  deleteQuizQuestion,
  addProjectIdea,
  getProjectIdeas,
  updateProjectIdea,
  deleteProjectIdea,
  searchResourcesOnPractice,
  filterPracticeResources,
  addRoadMap,
  getRoadMaps,
  getRoadMapById,
  searchRoadMaps,
  getMyProgress,
  updateMyProgress,
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/practiceController");

// Coding Problem Routes
router.post("/AddCodingProblem", addCodingProblem);
router.patch("/UpdateCodingProblem/:id", authMiddleware, updateCodingProblem);
router.delete("/DeleteCodingProblem/:id", authMiddleware, deleteCodingProblem);
router.get("/GetCodingProblem", getCodingProblem);

// Quiz Question Routes
router.post("/AddQuizQuestion", addQuizQuestion);
router.patch("/UpdateQuizQuestion/:id", authMiddleware, updateQuizQuestion);
router.delete("/DeleteQuizQuestion/:id", authMiddleware, deleteQuizQuestion);
router.get("/GetQuizQuestions", getQuizQuestions);

// Project Idea Routes
router.post("/AddProjectIdea", addProjectIdea);
router.get("/GetProjectIdeas", getProjectIdeas);
router.put("/UpdateProjectIdea/:id", authMiddleware, updateProjectIdea);
router.delete("/DeleteProjectIdea/:id", authMiddleware, deleteProjectIdea);

// Search and Filter Routes
router.get("/SearchResourcesOnPractice", searchResourcesOnPractice);
router.post("/FilterPracticeResources", filterPracticeResources);

// RoadMap Routes
router.post("/AddRoadMap", authMiddleware, addRoadMap);
router.get("/GetRoadMaps", getRoadMaps);
router.get("/GetRoadMap/:id", getRoadMapById);
router.get("/SearchRoadMaps", searchRoadMaps);

router
  .route("/")
  .get(authMiddleware, getMyProgress)
  .patch(authMiddleware, updateMyProgress);


  // CREATE
  router.post("/createQuestion", createQuestion);

  // READ ALL + FILTER
  router.get("/getAllQuestions", getAllQuestions);

  // READ SINGLE
  router.get("/getQuestionById/:id", getQuestionById);

  // UPDATE
  router.put("/updateQuestion/:id", updateQuestion);

  // DELETE
  router.delete("/deleteQuestion/:id", deleteQuestion);
module.exports = router;
