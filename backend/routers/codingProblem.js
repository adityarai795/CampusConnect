const express = require("express");
const router = express.Router();
const Problem=require("../models/CodingProblemSchema.js")

router.post("/addProblem", async (req, res) => {
  try {
    const { problem, status, level, topic, link } = req.body;

    const newProblem = new Problem({ problem, status, level, topic, link });
    await newProblem.save();
    res.status(200).json({message:"Problem added", newProblem})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
  

})

router.get("/getallProblem", async (req, res) => {
  try {
    const problem = await Problem.find();
    if (!problem) {
      return res.status(404).json({message :"Problem not find Something went wrong"})
    }
    res.status(200).json({ message: "Problem find", problem });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

module.exports = router;
