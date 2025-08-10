const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");
const Review = require("../models/ReviewSchema");
const auth = require("../middleware/authMiddleware");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } =require("multer-storage-cloudinary");
const multer = require("multer");
const {
  AddPost,
  ViewAllPost,
  ViewOnePost,
  UpdatePost,
  DeletePost,
  likeReview,
  addComment,
  showComments,
  deleteComment,
} = require("../controllers/communityControllers");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CampusConnect_Community",   
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const uploads = multer({ storage: storage });

router.post("/post/addPost",auth, uploads.single("image"), AddPost);

router.get("/post/viewall", ViewAllPost);

router.get("/post/:id", ViewOnePost);

router.patch("/post/:id/update", auth, uploads.single("image"), UpdatePost);

router.delete("/post/:id/delete", DeletePost);

router.post("/addcomment/:id",auth, addComment);

router.get("/showallPostComments/:id", showComments);

router.delete("/deleteComment/:id",auth, deleteComment);

router.get("/likes/:reviewId", likeReview);
module.exports = router;
