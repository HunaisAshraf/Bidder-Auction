import { Notification } from "../../../entities/notification";
import { INotificationRepository } from "../../interfaces/notification/INotifcationRepository";
import { INotificationInteractor } from "../../interfaces/notification/INotificationInteractor";

export class NotificationInteractor implements INotificationInteractor {
  private repository: INotificationRepository;
  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  async addNotification(user: string, message: string): Promise<Notification> {
    try {
      const notificaion = await this.repository.add(user, message);
      return notificaion;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getNotification(user: string): Promise<Notification[]> {
    try {
      const notificaion = await this.repository.get(user);
      return notificaion;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateNotification(id: string): Promise<Notification> {
    try {
      const notificaion = await this.repository.edit(id);
      return notificaion;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
