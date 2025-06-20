import Post from "../models/Post.js";

// create 
export const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save(); 
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a post by ID
export const getPost = async (req, res) => {
  const userId = req.params.id;
  try {
    const post = await Post.findById(userId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  try {
    const post = await Post.findById(postId);
    if (post.userId.toString() !== userId) {
      return res.status(403).json("You can only update your own posts");
    }
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      $set: req.body
    }, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// delete post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  try {
    const post = await Post.findById(postId);
    if (post.userId.toString() !== userId) {
      return res.status(403).json("You can only delete your own posts");
    }
    await post.deleteOne();
    res.status(200).json("Post deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


// get timeline posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profile")
      .populate("comments.userId", "username profile")
      .sort({ createdAt: -1 }); 
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};