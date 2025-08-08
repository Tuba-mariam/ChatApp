// controllers/ConversationController.ts
import { Response } from 'express';
import ConversationRepo from '../Repos/ConversationRepo';
import GenericNameSpace from '../Interfaces/GenericInterface';
import ConversationNameSpace from '../Interfaces/ConversationInterface';
import AuthNameSpace from '../Interfaces/AuthInterface';

class ConversationController {
  public static async createConversation(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { participant } = req.body;
    const userId = req.user?._id;
    try {
      const participants = [userId, participant];
      const conversation = await ConversationRepo.createConversation(participants);

      const Response: GenericNameSpace.IApiResponse<ConversationNameSpace.IModel> = {
        success: true,
        message: 'participants created successfully',
        data: conversation,
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

  // get all conversations by user id;

  // get specific conversation => param id; => in return the server will return the required conversation;

  public static async getConversations(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const userId = req.user?._id;

    try {
      const conversations = await ConversationRepo.getConversationParticipants(userId);

      if (!conversations) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'participants not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<ConversationNameSpace.IModel> = {
        success: true,
        data: conversations,
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to participant',
      };
      res.status(500).json(errorResponse);
    }
  }
}

export default ConversationController;
