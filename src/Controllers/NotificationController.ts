import { Response } from 'express';
import NotificationRepo from '../Repos/NotificationRepo';
import NotificationNameSpace from '../Interfaces/NotificationInterface';
import GenericNameSpace from '../Interfaces/GenericInterface';
import NotificationTypeEnum from '../Enum/NotificationTypeEnum';
import AuthNameSpace from '../Interfaces/AuthInterface';

class NotificationController {
  public static async sendNotification(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { sender } = req.params;
    const receiver = req.user?._id;
    const { groupId, messageId, title, type, body } = req.body;

    const payload: NotificationNameSpace.ICreate = {
      sender,
      receiver,
      group: type === NotificationTypeEnum.GROUP ? groupId : null,
      message: type === NotificationTypeEnum.PRIVATE ? messageId : null,
      title,
      type,
      body,
    };

    try {
      const notification = await NotificationRepo.createNotification(payload);
      const Response: GenericNameSpace.IApiResponse<NotificationNameSpace.IModel> = {
        success: true,
        data: notification,
        message: 'Notification sent successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Notification sent failed',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async getAll(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id as string;

    try {
      const notification = await NotificationRepo.getAllNotification(userId);
      if (!notification) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Notification not found',
        };
        res.status(500).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<NotificationNameSpace.IModel[]> = {
        success: true,
        data: notification,
        message: 'Notification fetch successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Notification fetch failed',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async markAsRead(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const notification = req.params.notification;

    try {
      await NotificationRepo.markAsReadNotification(notification);
      const Response: GenericNameSpace.IApiResponse<NotificationNameSpace.IModel> = {
        success: true,
        message: 'Messages marked as read successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Error marking message as read',
      };
      res.status(500).json(errorResponse);
    }
  }
}
export default NotificationController;
