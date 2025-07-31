const express = require("express");
const router = express.Router();
const {
  viewResult,
  uploadResult,
  showall,
  deleteLink,
} = require("../controllers/resultControllers");

router.post("/viewResultLink",viewResult );

router.post("/uploadResultLink", uploadResult);

router.get("/showall", showall);

router.delete("/deleteLink/:id", deleteLink);
module.exports = router;


