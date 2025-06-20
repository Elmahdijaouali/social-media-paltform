import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", postSchema);
export default Post;