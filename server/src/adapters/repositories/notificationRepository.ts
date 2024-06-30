import { INotificationRepository } from "../../application/interfaces/notification/INotifcationRepository";
import { Notification } from "../../entities/notification";
import { NotificationModel } from "../../infrastructure/db/models/notificationModel";
import { ErrorResponse } from "../../utils/errors";

export class NotificationRepository implements INotificationRepository {
  async add(user: string, message: string): Promise<Notification> {
    try {
      const notification = new NotificationModel({
        user,
        message,
      });
      await notification.save();
      return notification;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async get(user: string): Promise<Notification[]> {
    try {
      const notification = await NotificationModel.find({ user });
      return notification;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async edit(id: string): Promise<Notification> {
    try {
      const notification = await NotificationModel.findByIdAndUpdate(
        id,
        {
          read: true,
        },
        { new: true }
      );

      if (!notification) {
        throw new ErrorResponse("error in updating", 500);
      }

      return notification;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}
