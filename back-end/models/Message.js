import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chatId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: 'Chat'
    },
    text: { type: String, required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema );
export default Message;
