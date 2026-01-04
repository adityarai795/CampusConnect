const express = require("express");
const router = express.Router();
const {
  viewResult,
  uploadResult,
  showall,
  deleteLink,
  searchResultQuery,
} = require("../controllers/resultControllers");

router.post("/viewResultLink",viewResult );
router.get("/searchResultQuery", searchResultQuery);
router.post("/uploadResultLink", uploadResult);

router.get("/showall", showall);

router.delete("/deleteLink/:id", deleteLink);
module.exports = router;


