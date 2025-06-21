import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userId : {type:  mongoose.Schema.Types.ObjectId, ref: "Users" , required: true},
    friendId : { type:  mongoose.Schema.Types.ObjectId, ref: "Users" , required: true},
    status : {type: String, required: true , default : "allowed"}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);
export default User;
