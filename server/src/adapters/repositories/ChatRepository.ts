import { IChatRepository } from "../../application/interfaces/chat/IChatRepository";
import { Message } from "../../entities/message";
import { ChatModel } from "../../infrastructure/db/models/chatModel";
import { MessageModel } from "../../infrastructure/db/models/messageModel";

export class ChatRepository implements IChatRepository {
  async getChats(userId: string): Promise<any[]> {
    try {
      const chats = await ChatModel.find({
        users: { $in: [userId] },
      });

      return chats;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async createChat(firstUser: string, secondUser: string): Promise<any> {
    try {
      const chat = new ChatModel({
        users: [firstUser, secondUser],
      });
      await chat.save();

      return chat;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getMessage(chatId: string): Promise<Message[]> {
    try {
      const messages = await MessageModel.find({ chatId });
      return messages;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async createMessage(
    chatId: string,
    sender: string,
    message: string
  ): Promise<Message> {
    try {
      const newMessage = new MessageModel({
        chatId,
        sender,
        message,
      });
      await newMessage.save();
      return newMessage;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async checkChat(firstUser: string, secondUser: string): Promise<any> {
    try {
      const chat = await ChatModel.findOne({
        users: { $all: [firstUser, secondUser] },
      });
      return chat;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
