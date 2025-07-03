const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { login, signUp, logOut,forgetPassword } = require("../controllers/authControllers");

router.post('/signup', signUp)

router.post('/login', login)

//logout 
router.post("/logout", authMiddleware, logOut);

router.patch("/forget-password", authMiddleware, forgetPassword);

module.exports = router;
