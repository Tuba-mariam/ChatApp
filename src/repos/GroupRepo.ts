import GroupModel from '../models/Group/GroupModel';

class GroupRepo {
  static async createGroup(name: string, members: string[], createdBy: string) {
    return await GroupModel.create({ name, members, createdBy });
  }
  static async getGroup(groupId: string) {
    return await GroupModel.findOne({ _id: groupId }).populate('members').lean().exec();
  }
  static async addMembers(groupId: string, createdBy: string, member: string[]) {
    return await GroupModel.findOneAndUpdate({ groupId, createdBy }, { member });
  }
  static async removeMembers(groupId: string, member: string, createdBy: string) {
    return await GroupModel.findByIdAndDelete({ groupId, createdBy }, { member });
  }
}
export default GroupRepo;
