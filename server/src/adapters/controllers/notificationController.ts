import { NextFunction, Response } from "express";
import { INotificationInteractor } from "../../application/interfaces/notification/INotificationInteractor";
import { IRequestWithUser } from "../../application/types/types";

export class NotificaionController {
  private interactor: INotificationInteractor;

  constructor(interactor: INotificationInteractor) {
    this.interactor = interactor;
  }

  async onAddNotification(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user!;

      const { message } = req.body;

      const notificaion = await this.interactor.addNotification(
        id.toString(),
        message
      );

      return res.status(200).json({
        success: true,
        message: "notificattion added successfully",
        notificaion,
      });
    } catch (error) {
      next(error);
    }
  }

  async onGetNotification(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user!;

      const notification = await this.interactor.getNotification(id);

      return res.status(200).json({
        success: true,
        message: "notificattion get successfully",
        notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async onEditNotification(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const notification = await this.interactor.updateNotification(id);

      return res.status(200).json({
        success: true,
        message: "notification updated successfully",
        notification,
      });
    } catch (error) {
      next(error);
    }
  }
}
