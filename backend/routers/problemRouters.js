const express = require("express");
const router = express.Router();
const {
  addCodingProblem,
  deleteCodingProblem,
  getallCodingProblem,
  getallQuizProblem,
  addQuizProblem,
  deleteQuizProblem,
} = require("../controllers/problemController.js");

router.post("/addCodingProblem", addCodingProblem);
router.get("/getallCodingProblem", getallCodingProblem);
router.delete("/deleteCodingProblem/:id", deleteCodingProblem);
router.post("/filterCodingProblem", getallCodingProblem);



router.post("/filterQuizProblem", getallQuizProblem);
router.get("/getallQuizProblem", getallQuizProblem);
router.post("/addQuizProblem", addQuizProblem);
router.delete("/deleteQuizProblem/:id", deleteQuizProblem);


module.exports = router;
