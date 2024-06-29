import { Notification } from "../../../entities/notification";

export interface INotificationInteractor {
  addNotification(user: string, message: string): Promise<Notification>;
  getNotification(user: string): Promise<Notification[]>;
  updateNotification(id: string): Promise<Notification>;
}
