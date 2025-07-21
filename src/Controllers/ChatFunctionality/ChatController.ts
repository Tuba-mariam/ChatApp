import { Request, Response } from 'express';
import GenericNameSpace from '../../interfaces/Generic.interface';
import ChatRepo from '../../repos/ChatRepo';
import ChatNameSpace from '../../interfaces/ChatInterface';

class ChatController {
  public static async Send(req: Request, res: Response): Promise<void> {
    const message = req.body;
    try {
      const senMess = await ChatRepo.sendMessage(message);
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'Message sent successfully',
        data: senMess,
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Message sent failed',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async getMess(req: Request, res: Response): Promise<void> {
    const { sender, receiver } = req.body;
    try {
      const getMess = await ChatRepo.getMessage(sender, receiver);
        if (!getMess) {
         const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Message not found',
        };
       res.status(200).json(errorResponse);
       return
      }
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
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
    const messagesId = req.body;
    try {
      const updateMessage = await ChatRepo.markMessageAsRead(messagesId);
      if (!updateMessage) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Message not found already read',
        };
        res.status(200).json(errorResponse);
        return
      }
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: false,
        data: updateMessage,
        message: 'Message marked as read',
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
