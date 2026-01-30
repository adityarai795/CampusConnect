const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  login,
  signUp,
  logOut,
  forgetPassword,
  getuser,
  showalluser,
  googleLogin,
  approveAmbassador,
  createAmbassador,
  getAmbassadors,
} = require("../controllers/authControllers");

router.get("/getuser", authMiddleware, getuser);
router.get("/showalluser", showalluser);

router.post("/signup", signUp);

router.post("/login", login);
router.get("/google", googleLogin);
//logout
router.post("/logout", logOut);

router.patch("/forget-password", forgetPassword);

router
  .route("/ambassadors")
  .get(authMiddleware, getAmbassadors)
  .post(createAmbassador);
router.patch("/ambassadors/:id", approveAmbassador);

module.exports = router;
