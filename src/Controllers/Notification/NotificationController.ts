import GenericNameSpace from '../../interfaces/Generic.interface';
import NotificationNameSpace from '../../interfaces/NotificationInterface';
import { Response } from 'express';
import NotificationRepo from '../../repos/NotificationRepo';
import AuthNameSpace from '../../interfaces/Auth.interface';

class NotificationController {
  public static async Send(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id as string
    const content = req.body;
    try {
      const notification = await NotificationRepo.sendNotification(userId, content);
      const Response: GenericNameSpace.IApiResponse<NotificationNameSpace.IModel> = {
        success: true,
        data: notification,
        message: 'Notifcation sent successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Notification sent failed',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async get(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id as string
    
    try {
      const notification = await NotificationRepo.getNotification(userId);
      if(!notification){
         const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Notification not found',
      };
      res.status(500).json(errorResponse);
      return
    }
       const Response: GenericNameSpace.IApiResponse<NotificationNameSpace.IModel> = {
        success: true,
        data : notification,
        message :"Notification fetch succesfully",
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
}
export default NotificationController;
