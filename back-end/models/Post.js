import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    image: String,
    desc: String,
    image: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    comments: [
      {
        userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Users", 
          required: true 
        },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", postSchema);
export default Post;