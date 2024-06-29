import { Notification } from "../../../entities/notification";

export interface INotificationRepository {
  add(user: string, message: string): Promise<Notification>;
  get(user: string): Promise<Notification[]>;
  edit(id: string): Promise<Notification>;
}
