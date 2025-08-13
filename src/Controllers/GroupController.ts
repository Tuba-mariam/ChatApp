import { Response } from 'express';
import AuthNameSpace from '../Interfaces/AuthInterface';
import GenericNameSpace from '../Interfaces/GenericInterface';
import ChatRepo from '../Repos/ChatRepo';
import ChatNameSpace from '../Interfaces/ChatInterface';
import UserNameSpace from '../Interfaces/UserInterface';

class GroupController {
  public static async createGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupInfo, members } = req.body;
    const adminId = req.user?._id;

    try {
      const group = await ChatRepo.createGroup(groupInfo, members, adminId);

      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'Group created successfully',
        data: group,
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Group creation  failed',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async getGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    try {
      const group = await ChatRepo.findByQuery({ _id: groupId });

      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'group fetched successfully',
        data: group,
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to group ',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async addMemberToGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    const { member } = req.body;
    const userId = req.user?._id;

    try {
      const group = await ChatRepo.findByQuery({ _id: groupId, isGroup: true });
      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found!',
        };
        res.status(404).json(errorResponse);
        return;
      }
      const adminId = group.groupInfo?.admin?.toString();

      if (adminId !== userId) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Only admin can add the member',
        };
        res.status(403).json(errorResponse);
        return;
      }
      const oldMembers = group.members as UserNameSpace.IModel[];
      const oldMemberIds = oldMembers.map(item => item._id.toString());

      if (oldMemberIds.includes(member)) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'members already exist in the group',
        };
        res.status(409).json(errorResponse);
        return;
      }

      const updatedGroup = await ChatRepo.addMember(groupId, member);

      if (!updatedGroup) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Failed to add members',
        };
        res.status(500).json(errorResponse);
        return;
      }

      const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel> = {
        success: true,
        message: 'Member added successfully',
        data: updatedGroup,
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

  public static async removeMemberFromGroup(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    const { member } = req.body;
    const userId = req.user?._id;

    try {
      const group = await ChatRepo.findByQuery({ _id: groupId, isGroup: true });
      if (!group) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found!',
        };
        res.status(404).json(errorResponse);
        return;
      }

      const adminId = group.groupInfo?.admin?.toString();
      if (adminId !== userId) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Only admin can remove the member',
        };
        res.status(403).json(errorResponse);
        return;
      }
      if (member === userId) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Admin cannot remove themselves',
        };
        res.status(403).json(errorResponse);
        return;
      }

      const oldMembers = group.members as UserNameSpace.IModel[];
      const memberExists = oldMembers.some(item => item._id.toString() === member);
      if (!memberExists) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Member not found in the group',
        };
        res.status(404).json(errorResponse);
        return;
      }

      await ChatRepo.removeMember(groupId, member);
      const Response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Member removed successfully',
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
}

export default GroupController;
