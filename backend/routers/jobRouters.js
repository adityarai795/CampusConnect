
const express = require("express");
const router = express.Router();

const { addJob, showllPost } = require("../controllers/jobControllers.js");

router.post("/addJob", addJob);
router.get("/showall", showllPost);

module.exports = router;
