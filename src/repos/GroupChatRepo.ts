import GroupChatModel from '../models/GroupChatModel';

class GroupChatRepo {
  static async sendGroupMessage(groupId: string, message: string, sender: string) {
    return await GroupChatModel.create({ groupId, message, sender, ReadBy: [sender] });
  }
  static async getGroupChat(groupId: string) {
    return await GroupChatModel.find({ groupId }).populate('sender');
  }
}
export default GroupChatRepo;
