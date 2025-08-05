const express = require("express");
const Post = require("../models/PostsSchema");


module.exports.AddPost=async (req, res) => {
   const { title, description, college } = req.body;
  const file = req.file;
   try {
     const newPost = new Post({
       title,
       description,
       image: {
         url: `/uploads/${file.filename}`,
         filename: file.originalname,
       },
       college,
      //  owner: req.user._id,
     });

     const savedPost = await newPost.save();
     res.status(201).json(savedPost);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
}

module.exports.ViewAllPost=async (req, res) => {
  try {
    const posts = await Post.find({})

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({ message: "View all posts", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.ViewOnePost=async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post found", post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports.UpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (req.file) {
      updateData.image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.originalname,
      };
    }
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};