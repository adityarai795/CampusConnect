const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {getProfile}=require("../controllers/profileController.js")

router.get("/profile_get",authMiddleware, getProfile);




module.exports = router;
