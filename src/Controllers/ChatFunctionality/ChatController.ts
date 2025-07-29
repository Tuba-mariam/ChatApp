import { Request, Response } from 'express';
import GenericNameSpace from '../../interfaces/Generic.interface';
import ChatRepo from '../../repos/ChatRepo';
import ChatNameSpace from '../../interfaces/ChatInterface';
import AuthNameSpace from '../../interfaces/Auth.interface';

class ChatController {
  public static async sendMessage(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { message, receiver } = req.body;
    const sender = req.user?._id;
    try {
      const messages = await ChatRepo.sendMessage(message, receiver, sender);
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'Message sent successfully',
        data: messages,
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Message sent failed',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async getMessages(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const sender = req.user?._id;
    const receiver = req.params.receiver;
    try {
      const messages = await ChatRepo.getMessage(sender, receiver);
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel[]> = {
        success: true,
        data: messages,
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to fetch messages',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async markAsRead(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { sender } = req.params;
    const receiver = req.user?._id;

    try {
      await ChatRepo.markMessageAsRead(sender, receiver);

      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
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

export default ChatController;
