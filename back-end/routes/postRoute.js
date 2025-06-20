import express from "express";
import { 
  createPost, 
  deletePost, 
  getAllPosts, 
  getPost, 
  updatePost,
  likePost,
  addComment,
  deleteComment,
  getUserPosts
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);  
router.post("/:id/comment", addComment);
router.delete("/:id/comment", deleteComment);
router.get("/user/:userId", getUserPosts);

export default router;