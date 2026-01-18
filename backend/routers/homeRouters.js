const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/homepagedata", homeController.homePageData);

module.exports = router;