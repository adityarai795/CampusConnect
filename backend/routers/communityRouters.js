const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");
const Review = require("../models/ReviewSchema");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const {
  AddPost,
  ViewAllPost,
  ViewOnePost,
  UpdatePost,
  DeletePost,
  addComment,
  likeReview,
} = require("../controllers/communityControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/post/addPost", uploads.single("image"), AddPost);

router.get("/post/viewall", ViewAllPost);

router.get("/post/:id", ViewOnePost);

router.patch("/post/:id/update", auth, uploads.single("image"), UpdatePost);

router.delete("/post/:id/delete", DeletePost);

router.post("/addcomment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }
    const newReview = new Review({ comment });
    await newReview.save();
    const post = await Post.findById(id);
    post.reviews.push(newReview._id);
    await post.save();
    res.status(201).json({ message: "Comment Can Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/showallPostComments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("reviews").sort({ _id: -1 });

    if (!post) {
      return res.status(400).json({ message: "Data not found" });
    }
    res
      .status(200)
      .json({ data: post, message: "Fetch all Data successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deleteComment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Review.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
