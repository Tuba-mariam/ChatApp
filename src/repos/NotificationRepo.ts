import NotificationNameSpace from '../Interfaces/NotificationInterface';
import NotificationModel from '../Models/NotificationModel';

class NotificationRepo {
  static async createNotification(data: NotificationNameSpace.ICreate) {
    return await NotificationModel.create(data);
  }
  static async getAllNotification(userId: string) {
    return await NotificationModel.find({ receiver: userId });
  }

  static async markAsReadNotification(notification: string) {
    return await NotificationModel.findByIdAndUpdate(notification);
  }
}
export default NotificationRepo;
