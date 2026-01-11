const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkUserStatus = require('../middleware/userStatusMiddleware');
const { createTeacher,getAllTeacher,updateTeacher } = require('../controllers/teacherControllers');

// router.use(authMiddleware);
// router.use(checkUserStatus);


router.post("/create", createTeacher);
router.get("/all", getAllTeacher);
router.put("/update/:id", updateTeacher);
module.exports = router;
