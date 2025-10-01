import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  fileUrl: String,
seen: {
  type: Boolean,
  default: false,
}
}, { timestamps: true });

export const Message= mongoose.model("Message", messageSchema);
