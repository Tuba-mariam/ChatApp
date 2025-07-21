import NotificationModel from '../models/Notification/NotificationModel';

class NotificationRepo {
  static async sendNotification(userId: string , content : string) {
    return await NotificationModel.create({userId, content});
  }
    static async getNotification(userId: string) {
    return await NotificationModel.findById(userId);
  }
}
export default NotificationRepo
