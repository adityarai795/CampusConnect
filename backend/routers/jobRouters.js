
const express = require("express");
const router = express.Router();

const {
  addJob,
  deletePost,showllPost,
} = require("../controllers/jobControllers.js");

router.post("/addJob", addJob);
router.get("/showall", showllPost);
router.delete("/deletePost/:id", deletePost);
module.exports = router;
