const express = require("express");
const {
  getAllRoadmaps,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  getRoadmapById,
} = require("../controllers/roadmapControllers");
const router = express.Router();

router.get("/getAll", getAllRoadmaps);
router.post("/create", createRoadmap);
router.get("/get/:id", getRoadmapById);
router.put("/update/:id", updateRoadmap);
router.delete("/delete/:id", deleteRoadmap);

module.exports = router;
