import GroupModel from '../models/Group/GroupModel';

class GroupRepo {
  static async createGroup(name: string, members: string[], createdBy: string) {
    return await GroupModel.create({ name, members, createdBy });
  }
    static async getMember(groupId: string,) {
    return await GroupModel.findById(groupId);
  }
     static async addMembers(userId: string, members:string) {
    return await GroupModel.findByIdAndUpdate(members , {userId});
  }
     static async removeMembers(groupId: string , userId: string) {
    return await GroupModel.findByIdAndDelete(groupId , {userId});
  }

}
export default GroupRepo
