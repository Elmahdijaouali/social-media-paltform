import mongoose from "mongoose";

const friendSchema = mongoose.Schema(
  {
    userId : {type:  mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    friendId : { type:  mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    status : {type: String, required: true , default : "allowed"}
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model("Friend", friendSchema);
export default Friend;
