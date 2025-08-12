const Post = require("../models/PostsSchema");
const {Like ,Comment} = require("../models/ReviewSchema");
// const Review = require("../models/reviewSchema");


module.exports.AddPost = async (req, res) => {
   const { title, description, college } = req.body;
  const file = req.file;
   try {
     const newPost = new Post({
       title,
       description,
       image: {
         url: file.path, // Cloudinary's URL
         filename: file.filename, // Cloudinary's public_id
       },
       college,
        owner: req.user._id,
     });

     const savedPost = await newPost.save();
     res.status(201).json(savedPost);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
}

module.exports.ViewAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ _id: -1 })
      .populate({ path: "owner", select: "username" });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({ message: "View all posts", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports.ViewOnePost=async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate({
      path: "owner",
      select: "username",
    });
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

// Add a comment to a post
module.exports.addComment = async (req, res) => {
  const { id } = req.params;
  try {
    const { comment ,userId } = req.body;
    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }
    const newReview = new Comment({ comment });
    await newReview.save();
    const post = await Post.findById(id);
    post.comment.push(newReview._id);
    await post.save();
    res.status(201).json({ message: "Comment Can Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

module.exports.showComments = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate({
      path: "comment",
      options: { sort: { _id: -1 } },
    });


    if (!post) {
      return res.status(400).json({ message: "Data not found" });
    }
    res
      .status(200)
      .json({ data: post, message: "Fetch all Data successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

module.exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// // // Like a post (increments like count of a review)
module.exports.likeReview = async (req, res) => {
  try {
    const { postId } = req.params;
     const newLike = await Like.create({
       like: 1,
       post: postId, 
     });

     post.like.push(newLike._id);
     await post.save();

     res.json({ message: "Post liked" });
    const post = await Like.findOne
    post.like.push(like+1)
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

