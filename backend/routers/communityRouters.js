const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const { AddPost, ViewAllPost,ViewOnePost,UpdatePost,DeletePost } = require("../controllers/communityControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
}); 
const uploads = multer({ storage: storage });

router.post("/post/addPost", uploads.single('image'), AddPost);

router.get("/post/viewall", ViewAllPost);

router.get("/post/:id", ViewOnePost);

router.patch("/post/:id/update", auth, uploads.single("image"), UpdatePost);

router.delete("/post/:id/delete",DeletePost );


module.exports = router;