import { NextFunction, Request, Response } from "express";
import { IChatInteractor } from "../../application/interfaces/chat/IChatInteractor";
import { IRequestWithUser } from "../../application/types/types";

export class ChatController {
  private interactor: IChatInteractor;
  constructor(interactor: IChatInteractor) {
    this.interactor = interactor;
  }

  async onAddChat(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const { secondUser } = req.body;

      const chat = await this.interactor.addChat(id, secondUser);

      return res.status(200).json({ success: true, chat });
    } catch (error) {
      next(error);
    }
  }

  async onGetChats(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const chat = await this.interactor.getChat(id);

      return res.status(200).json({ success: true, chat });
    } catch (error) {
      next(error);
    }
  }

  async ongetMessages(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { chatId } = req.body;

      const data = await this.interactor.getMessage(chatId);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async onAddMessage(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const { chatId } = req.params;
      const { message } = req.body;

      const newMessage = await this.interactor.createMessage(
        chatId,
        id,
        message
      );
      return res.status(200).json({
        success: true,
        newMessage,
      });
    } catch (error) {
      next(error);
    }
  }
}
