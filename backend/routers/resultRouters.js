const express = require("express");
const router = express.Router();
const { viewResult, uploadResult, showall } = require("../controllers/resultControllers");

router.post("/viewResultLink",viewResult );

router.post("/uploadResultLink", uploadResult);

router.get("/showall", showall);
module.exports = router;


