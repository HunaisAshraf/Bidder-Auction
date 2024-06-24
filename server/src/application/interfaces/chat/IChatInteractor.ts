import { Message } from "../../../entities/message";

export interface IChatInteractor {
  getChat(chatId: string): Promise<any[]>;
  addChat(firstUser: string, secondUser: string): Promise<any>;
  getMessage(chatId: string): Promise<Message[]>;
  createMessage(
    chatId: string,
    sender: string,
    message: string
  ): Promise<Message>;
}
