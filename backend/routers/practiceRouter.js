const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {
  addCodingProblem,
  getCodingProblem,
  updateCodingProblem,
  updateQuizQuestion,
  addQuizQuestion,
  getQuizQuestions,
  addProjectIdea,
  getProjectIdeas,
  searchResourcesOnPractice,
  filterPracticeResources,
  addRoadMap,
  getRoadMaps,
  getRoadMapById,
  searchRoadMaps,
  getMyProgress,
  updateMyProgress,
} = require("../controllers/practiceController");


// Coding Problem Routes
router.post('/AddCodingProblem', authMiddleware, addCodingProblem);
router.patch('/UpdateCodingProblem', authMiddleware, updateCodingProblem);
router.get('/GetCodingProblem', getCodingProblem);

// Quiz Question Routes
router.post('/AddQuizQuestion', authMiddleware, addQuizQuestion);
router.patch('/UpdateQuizQuestion', authMiddleware, updateQuizQuestion);
router.get('/GetQuizQuestions', getQuizQuestions);

// Project Idea Routes
router.post('/AddProjectIdea', authMiddleware, addProjectIdea);
router.get('/GetProjectIdeas', getProjectIdeas);

// Search and Filter Routes
router.get('/SearchResourcesOnPractice', searchResourcesOnPractice);
router.post('/FilterPracticeResources', filterPracticeResources);


// RoadMap Routes
router.post('/AddRoadMap', authMiddleware, addRoadMap);
router.get('/GetRoadMaps', getRoadMaps);
router.get('/GetRoadMap/:id', getRoadMapById);
router.get('/SearchRoadMaps', searchRoadMaps);


router.route("/")
  .get(authMiddleware, getMyProgress)
  .patch(authMiddleware, updateMyProgress);

module.exports = router;