import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {type: String, required: true, unique: true },
    bio : String , 
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);
export default User;
