const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  login,
  signUp,
  logOut,
  forgetPassword,
  getuser,
  showalluser,
} = require("../controllers/authControllers");

router.get("/getuser/:id", getuser);
router.get("/showalluser", showalluser);

router.post('/signup', signUp)

router.post('/login', login)

//logout 
router.post("/logout", logOut);

router.patch("/forget-password", forgetPassword);

module.exports = router;
