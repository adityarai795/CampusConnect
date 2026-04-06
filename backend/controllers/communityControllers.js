const Post = require("../models/PostsSchema");
const {Like ,Comment} = require("../models/ReviewSchema");
// const Review = require("../models/reviewSchema");


module.exports.AddPost = async (req, res) => {
  const { title, description, collage } = req.body;
  const file = req.file; // Optional

  try {
    const newPost = new Post({
      title,
      description,
      collage,
      owner: req.user._id,
    });

    if (file) {
      newPost.image = {
        url: file.path, 
        filename: file.filename,
      };
    }

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.ViewAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ _id: -1 })
      .populate({ path: "owner", select: "name" });

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
      select: "name",
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post found", post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports.ViewMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "owner", select: "name" });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.UpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Unauthorized: You can only edit your own posts" 
      });
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ 
      message: "Post updated successfully", 
      post: updatedPost 
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports.DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Unauthorized: You can only delete your own posts" 
      });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Add a comment to a post
module.exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const userId = req.user._id;

  try {
    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    // Create new comment
    const newReview = new Comment({
      comment,
      post: postId,
      user: userId,
    });
    await newReview.save();

    // Add comment to post's comments array
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comment.push(newReview._id);
    await post.save();

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.showComments = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate({
      path: "comment",
      populate: {
        path: "user",
        select: "name"
      },
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
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    await Post.findByIdAndUpdate(comment.post, { $pull: { comment: id } });

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post (increments like count of a review)
module.exports.likeReview = async (req, res) => {
  try {
    const { postId } = req.params; 
    const userId = req.user._id; 


    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.like.some(id => id.equals(userId));

    if (isLiked) {
      post.like.pull(userId);
    } else {

      post.like.push(userId);
    }

    await post.save();
    
    res.status(200).json({ 
      success: true, 
      isLiked: !isLiked, 
      likeCount: post.like.length 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
