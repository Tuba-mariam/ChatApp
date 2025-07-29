import { Response } from 'express';
import AuthNameSpace from '../interfaces/Auth.interface';
import GenericNameSpace from '../interfaces/Generic.interface';
import GroupChatNameSpace from '../interfaces/GroupChatInterface';
import GroupChatRepo from '../repos/GroupChatRepo';

class GroupChatController {
  public static async sendGroupChat(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    const { message } = req.body;
    const sender = req.user?._id;
    try {
      const groupChat = await GroupChatRepo.sendGroupMessage(groupId, message, sender);
      if (!groupChat) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'groupChat not found',
        };
        res.status(404).json(errorResponse);
        return;
      }

      const Response: GenericNameSpace.IApiResponse<GroupChatNameSpace.IModel> = {
        success: true,
        message: 'Message sent successfully',
        data: groupChat,
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
  public static async getGroupChat(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    try {
      const group = await GroupChatRepo.getGroupChat(groupId);
      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'group not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<GroupChatNameSpace.IModel[]> = {
        success: true,
        data: group,
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
export default GroupChatController;
