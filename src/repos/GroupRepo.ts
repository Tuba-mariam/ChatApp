import GroupModel from '../models/Group/GroupModel';

class GroupRepo {
  static async createGroup(name: string, members: string[], createdBy: string) {
    return await GroupModel.create({ name, members, createdBy });
  }
  static async getMember(groupId: string) {
    return await GroupModel.findById(groupId);
  }
  static async addMembers(userId: string, Newmembers: string, groupId: string) {
    return await GroupModel.findByIdAndUpdate(groupId, { _id: Newmembers, userId }, { new: true });
  }
  static async removeMembers(groupId: string, membersId: string, userId: string) {
    return await GroupModel.findByIdAndDelete(groupId, { membersId, userId });
  }
}
export default GroupRepo;
