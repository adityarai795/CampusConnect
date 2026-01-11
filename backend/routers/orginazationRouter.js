const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkUserStatus = require('../middleware/userStatusMiddleware');
const { createOrganization, getAllOrginazation,updateOrginazation } = require('../controllers/orginazationController');


// router.use(authMiddleware);
// router.use(checkUserStatus);

router.post("/create", createOrganization);
router.get("/all", getAllOrginazation);
router.put("/update/:id", updateOrginazation);
module.exports = router;