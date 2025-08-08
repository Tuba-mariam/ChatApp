import GroupModel from '../Models/GroupModel';

class GroupRepo {
  static async createGroup(name: string, members: string[], createdBy: string) {
    return await GroupModel.create({ name, members, createdBy });
  }
  static async getGroup(groupId: string) {
    return await GroupModel.findOne({ _id: groupId }).populate('members').lean().exec();
  }
  static async addMembers(groupId: string, createdBy: string, members: string[]) {
    return await GroupModel.findOneAndUpdate({ _id: groupId, createdBy }, { members });
  }
  static async removeMembers(groupId: string, member: string, createdBy: string) {
    return await GroupModel.findByIdAndDelete({ groupId, createdBy }, { member });
  }
}
export default GroupRepo;
