import ChatGroupModel from '../models/GroupChatModel';

class ChatGroupRepo {
  static async sendChatGroup(sender: string, groupId: string, message: string) {
    return await ChatGroupModel.create({ sender, groupId, message });
  }
  static async getGroupMessage(groupId: string) {
    return await ChatGroupModel.find({ groupId }).populate('sender');
  }
}
export default ChatGroupRepo;
