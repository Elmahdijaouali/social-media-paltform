import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    members : [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ], 

    },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat ;
