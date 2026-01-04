const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {getProfile,updateProfile}=require("../controllers/profileController.js")

router.get("/profile_get", authMiddleware, getProfile);

router.patch("/profile_update", authMiddleware, updateProfile);




module.exports = router;
