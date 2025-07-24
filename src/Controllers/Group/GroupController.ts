import GenericNameSpace from '../../interfaces/Generic.interface';
import { Request, Response } from 'express';
import GroupRepo from '../../repos/GroupRepo';
import AuthNameSpace from '../../interfaces/Auth.interface';
import GroupNameSpace from '../../interfaces/GroupInterface';

class GroupController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { name, members, createdBy } = req.body;
    try {
      const groups = await GroupRepo.createGroup(name, members, createdBy);
      const Response: GenericNameSpace.IApiResponse<GroupNameSpace.IModel> = {
        success: true,
        message: 'Group created successfully',
        data: groups,
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Group craetion  failed',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async get(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId } = req.params;
    try {
      const getGroup = await GroupRepo.getMember(groupId);
      if (!getGroup) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<GroupNameSpace.IModel> = {
        success: true,
        data: getGroup,
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
  public static async add(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { Newmembers, groupId } = req.body;
    const userId = req.user?._id;
    try {
      const addGroup = await GroupRepo.addMembers(Newmembers, groupId, userId);
      if (!addGroup) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<GroupNameSpace.IModel> = {
        success: true,
        data: addGroup,
        message: 'Members added succesfully',
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
  public static async remove(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const { groupId, membersId } = req.body;
    const userId = req.user?._id;
    try {
      const removeGroup = await GroupRepo.removeMembers(groupId, userId, membersId);
      if (!removeGroup) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Group not found',
        };
        res.status(200).json(errorResponse);
        return;
      }
      const Response: GenericNameSpace.IApiResponse<GroupNameSpace.IModel> = {
        success: true,
        data: removeGroup,
        message: 'Members remove succesfully',
      };
      res.status(200).json(Response);
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Failed to remove members',
      };
      res.status(500).json(errorResponse);
    }
  }
}
export default GroupController;
