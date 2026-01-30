const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/homepagedata", homeController.homePageData);
router.post("/contact", homeController.contactFormSubmit);
router.post("/subscribe", homeController.subscribeEmail);
module.exports = router;