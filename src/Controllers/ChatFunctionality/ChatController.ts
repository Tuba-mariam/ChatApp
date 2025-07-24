import { Request, Response } from 'express';
import GenericNameSpace from '../../interfaces/Generic.interface';
import ChatRepo from '../../repos/ChatRepo';
import ChatNameSpace from '../../interfaces/ChatInterface';
import AuthNameSpace from '../../interfaces/Auth.interface';

class ChatController {
  public static async Send(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { message, receiver } = req.body;
    const sender = req.user?._id;
    try {
      const sendNewMess = await ChatRepo.sendMessage(message, receiver, sender);
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel[]> = {
        success: true,
        message: 'Message sent successfully',
        data: sendNewMess,
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
  public static async getMess(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const sender = req.user?._id;
    const receiver = req.params.receiver;
    try {
      const getMess = await ChatRepo.getMessage(sender, receiver);
      if (!getMess) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Message not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel[]> = {
        success: true,
        data: getMess,
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
  public static async markAsRead(req: Request, res: Response): Promise<void> {
    const { messagesId } = req.body;

    try {
      const updateMessage = await ChatRepo.markMessageAsRead(messagesId);

      if (!updateMessage) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'No messages found or already marked as read',
        };
        res.status(200).json(errorResponse);
        return;
      }

      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        data: updateMessage,
        message: 'Messages marked as read successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Error marking message as read',
      };
      res.status(500).json(errorResponse);
    }
  }
}
export default ChatController;
