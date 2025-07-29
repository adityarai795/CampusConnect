const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  login,
  signUp,
  logOut,
  forgetPassword,
  getuser,
} = require("../controllers/authControllers");

router.get("/getuser/:id", getuser);
router.post('/signup', signUp)

router.post('/login', login)

//logout 
router.post("/logout", authMiddleware, logOut);

router.patch("/forget-password", forgetPassword);

module.exports = router;
