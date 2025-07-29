import GenericNameSpace from '../../interfaces/Generic.interface';
import { Request, Response } from 'express';
import GroupRepo from '../../repos/GroupRepo';
import AuthNameSpace from '../../interfaces/Auth.interface';
import GroupNameSpace from '../../interfaces/GroupInterface';
import UserNameSpace from '../../interfaces/User.interface';

class GroupController {
  public static async createGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { name, members } = req.body;
    const createdBy = req.user?._id;
    try {
      const group = await GroupRepo.createGroup(name, members, createdBy);
      const Response: GenericNameSpace.IApiResponse<GroupNameSpace.IModel> = {
        success: true,
        message: 'Group created successfully',
        data: group,
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Group creation  failed',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async getGroupMembers(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    try {
      const group = await GroupRepo.getGroup(groupId);

      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<UserNameSpace.IModel[]> = {
        success: true,
        data: group.members as UserNameSpace.IModel[],
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to get members',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async addMemberToGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    const { member } = req.body;
    const userId = req.user?._id;

    try {
      const group = await GroupRepo.getGroup(groupId);
      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found!',
        };
        res.status(404).json(errorResponse);
        return;
      }

      const oldMembers = group.members as UserNameSpace.IModel[];
      const newMembers = [...oldMembers.map(item => item._id), member];

      await GroupRepo.addMembers(groupId, userId, newMembers);
      const Response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Member added successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to add members',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async removeMemberFromGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    const { member } = req.body;
    const userId = req.user?._id;

    try {
      const group = await GroupRepo.getGroup(groupId);
      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found!',
        };
        res.status(404).json(errorResponse);
        return;
      }

      const oldMembers = group.members as UserNameSpace.IModel[];
      const newMembers = oldMembers.filter(item => item._id !== member).map(item => item._id);

      await GroupRepo.addMembers(groupId, userId, newMembers);
      const Response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Member removed successfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to add members',
      };
      res.status(500).json(errorResponse);
    }
  }
}
export default GroupController;
