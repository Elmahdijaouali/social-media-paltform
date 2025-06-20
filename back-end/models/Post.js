import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    desc: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", postSchema);
export default Post;