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
import multer from 'multer';
import path from 'path';
import verifyAuth  from "../middlewares/auth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/posts/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", verifyAuth , upload.single('image'), createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);
router.post("/:id/comment", addComment);
router.delete("/:id/comment", deleteComment);
router.get("/user/:userId", getUserPosts);

export default router;