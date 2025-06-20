import Post from "../models/Post.js";
import User from "../models/User.js";
import Like from "../models/Like.js";
import Comment from "../models/Comment.js";

// create post with image upload
export const createPost = async (req, res) => {
  try {
    const {  desc } = req.body;
    const image = req.file ? req.file.path : null;
    const id = req.user.id
    if (!id) {
      return res.status(401).json({ message: 'Unauthorized: No user ID' });
    }

    const newPost = new Post({
      userId : id ,
      desc,
      image
    });
    
    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id)
      .populate("userId", "username profile cover firstname lastname");
    
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get post by ID
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "username profile cover firstname lastname");
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const likes = await Like.find({ post: post._id })
      .populate("user", "username profile firstname lastname");
    
    const comments = await Comment.find({ post: post._id })
      .populate("user", "username profile firstname lastname")
      .sort({ createdAt: -1 });
    
    const postWithDetails = {
      ...post.toObject(),
      likes,
      comments
    };
    
    res.status(200).json(postWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// uupdate post with optional image upload
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.userId.toString() !== req.body.userId) {
      return res.status(403).json("You can only update your own posts");
    }
    
    const updateData = {
      ...req.body,
      ...(req.file && { image: req.file.path })
    };
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).populate("userId", "username profile cover firstname lastname");
    
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.userId.toString() !== req.body.userId) {
      return res.status(403).json("You can only delete your own posts");
    }
    
    await Like.deleteMany({ post: post._id });
    await Comment.deleteMany({ post: post._id });
    
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profile cover firstname lastname")
      .sort({ createdAt: -1 });
    
    const postsWithDetails = await Promise.all(posts.map(async post => {
      const likes = await Like.find({ post: post._id })
        .populate("user", "username profile firstname lastname");
      
      const comments = await Comment.find({ post: post._id })
        .populate("user", "username profile firstname lastname")
        .sort({ createdAt: -1 });
      
      return {
        ...post.toObject(),
        likes,
        comments
      };
    }));
    
    res.status(200).json(postsWithDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// like post
export const likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const postId = req.params.id;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const existingLike = await Like.findOne({ user: userId, post: postId });
    
    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
    } else {
      const newLike = new Like({
        user: userId,
        post: postId
      });
      await newLike.save();
    }
    
    const updatedLikes = await Like.find({ post: postId })
      .populate("user", "username profile firstname lastname");
    
    res.status(200).json(updatedLikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add comment
export const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const postId = req.params.id;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const newComment = new Comment({
      user: userId,
      post: postId,
      text
    });
    
    const savedComment = await newComment.save();
    const populatedComment = await Comment.findById(savedComment._id)
      .populate("user", "username profile firstname lastname");
    
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const postId = req.params.id;
    
    const comment = await Comment.findOne({ 
      _id: commentId, 
      post: postId 
    }).populate("user", "_id");
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    const post = await Post.findById(postId);
    if (comment.user._id.toString() !== req.body.userId && 
        post.userId.toString() !== req.body.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }
    
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate("userId", "username profile cover firstname lastname")
      .sort({ createdAt: -1 });
    
    const postsWithDetails = await Promise.all(posts.map(async post => {
      const likes = await Like.find({ post: post._id })
        .populate("user", "username profile firstname lastname");
      
      const comments = await Comment.find({ post: post._id })
        .populate("user", "username profile firstname lastname")
        .sort({ createdAt: -1 });
      
      return {
        ...post.toObject(),
        likes,
        comments
      };
    }));
    
    res.status(200).json(postsWithDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};