import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userId : {type:  mongoose.Schema.Types.ObjectId, ref: "Users" , required: true},
    friendId : { type:  mongoose.Schema.Types.ObjectId, ref: "Users" , required: true},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);
export default User;
