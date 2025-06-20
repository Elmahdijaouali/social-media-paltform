import Post from "../models/Post.js";
import User from "../models/User.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { userId, desc, image } = req.body;
    const newPost = new Post({
      userId,
      desc,
      image
    });
    
    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id)
      .populate("userId", "username profile cover firstname lastname")
      .populate("likes", "username profile firstname lastname")
      .populate("comments.userId", "username profile firstname lastname");
    
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Post by ID
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "username profile cover firstname lastname")
      .populate("likes", "username profile firstname lastname")
      .populate("comments.userId", "username profile firstname lastname");
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.userId.toString() !== req.body.userId) {
      return res.status(403).json("You can only update your own posts");
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    .populate("userId", "username profile cover firstname lastname")
    .populate("likes", "username profile firstname lastname")
    .populate("comments.userId", "username profile firstname lastname");
    
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.userId.toString() !== req.body.userId) {
      return res.status(403).json("You can only delete your own posts");
    }
    
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Posts (Timeline)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profile cover firstname lastname")
      .populate("likes", "username profile firstname lastname")
      .populate("comments.userId", "username profile firstname lastname")
      .sort({ createdAt: -1 });
    
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like/Unlike Post
export const likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const isLiked = post.likes.includes(userId);
    
    if (isLiked) {
      // Unlike
      await Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Like
      await Post.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }
    
    const updatedPost = await Post.findById(req.params.id)
      .populate("userId", "username profile cover firstname lastname")
      .populate("likes", "username profile firstname lastname")
      .populate("comments.userId", "username profile firstname lastname");
    
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userId,
            text
          }
        }
      },
      { new: true }
    )
    .populate("userId", "username profile cover firstname lastname")
    .populate("likes", "username profile firstname lastname")
    .populate("comments.userId", "username profile firstname lastname");
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: commentId
          }
        }
      },
      { new: true }
    )
    .populate("userId", "username profile cover firstname lastname")
    .populate("likes", "username profile firstname lastname")
    .populate("comments.userId", "username profile firstname lastname");
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const comment = post.comments.find(c => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User's Posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate("userId", "username profile cover firstname lastname")
      .populate("likes", "username profile firstname lastname")
      .populate("comments.userId", "username profile firstname lastname")
      .sort({ createdAt: -1 });
    
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};