const express = require("express");
const router = express.Router();
const {
  uploadResource,
  viewResource,
  viewAll,
} = require("../controllers/resourceControllers");

// POST /api/resource/upload
router.post("/uploadResource", uploadResource);

// search the data
router.post("/viewResource", viewResource);

//show all Data
router.get("/showall", viewAll);

module.exports = router;
