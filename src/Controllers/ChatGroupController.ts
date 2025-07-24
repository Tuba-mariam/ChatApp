import { Response } from 'express';
import AuthNameSpace from '../interfaces/Auth.interface';
import ChatGroupNameSpace from '../interfaces/ChatGroupInterface';
import GenericNameSpace from '../interfaces/Generic.interface';
import ChatGroupRepo from '../repos/ChatGroupRepo';

class ChatGroupController {
  public static async SendChat(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId, message } = req.body;
    const sender = req.user?._id;
    try {
      const senMess = await ChatGroupRepo.sendChatGroup(message, groupId, sender);
      const Response: GenericNameSpace.IApiResponse<ChatGroupNameSpace.IModel> = {
        success: true,
        message: 'Message sent successfully',
        data: senMess,
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
  public static async getChatGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    try {
      const getMess = await ChatGroupRepo.getGroupMessage(groupId);
      if (!getMess) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Message not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<ChatGroupNameSpace.IModel[]> = {
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
}
export default ChatGroupController;
