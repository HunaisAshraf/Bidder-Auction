import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  users: {
    type: Array,
  },
});

export const ChatModel = mongoose.model("Chat", chatSchema);
