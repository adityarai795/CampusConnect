
const express = require("express");
const router = express.Router();

const {
  addJob,
  deletePost,
  showllPost,
  applyJob,
  myAppiliedJobs,
  getApplicantsForJob,searchJobs
} = require("../controllers/jobControllers.js");
const  authmiddleware  = require("../middleware/authMiddleware.js");

router.post("/addJob",authmiddleware, addJob);
router.get("/showall", showllPost);
router.post("/applyJob/:id", authmiddleware, applyJob);
router.get("/myApplications", authmiddleware, myAppiliedJobs);
router.get("/recruiter/job/:id", authmiddleware, getApplicantsForJob);
router.get("/searchJobs", searchJobs);
router.delete("/deletePost/:id", authmiddleware, deletePost);
module.exports = router;
