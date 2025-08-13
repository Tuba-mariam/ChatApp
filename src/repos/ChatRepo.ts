import ChatModel, { chatSchema } from '../Models/ChatModel';
import ChatNameSpace from '../Interfaces/ChatInterface';
import { FilterQuery } from 'mongoose';

class ChatRepo {
  static async addMessageToChat(chatId: string, message: ChatNameSpace.Message) {
    return await ChatModel.findByIdAndUpdate(chatId, { $push: { messages: message } }).lean();
  }

  static async findOneToOneChat(sender: string, receiverId: string) {
    return await ChatModel.findOne({
      members: { $all: [sender, receiverId] },
      'members.2': { $exists: false },
      isGroup: false,
    });
  }

  static async createNewChat(members: string[], message: ChatNameSpace.Message) {
    return await ChatModel.create({
      members,
      messages: [message],
      isGroup: false,
    });
  }

  static async createGroup(groupInfo: ChatNameSpace.ICreateGroupInfo, members: string[], adminId: string) {
    return await ChatModel.create({
      groupInfo: {
        title: groupInfo.title,
        image: groupInfo.image || '',
        admin: adminId,
      },
      members: [...members, adminId],
      isGroup: true,
    });
  }

  static async findAllByMember(userId: string) {
    return ChatModel.find({ members: userId }).lean();
  }

  static async findByQuery(query: FilterQuery<ChatNameSpace.IModel>) {
    return await ChatModel.findOne(query).populate('members', 'phoneNumber');
  }

  static async addMember(groupId: string, newMember: string) {
    return ChatModel.findByIdAndUpdate(groupId, { $push: { members: newMember } });
  }

  static async removeMember(groupId: string, memberId: string) {
    return ChatModel.findByIdAndUpdate(groupId, { $pull: { members: memberId } });
  }

  static async markMessageAsRead(userId: string, chatId: string) {
    return await ChatModel.updateOne(
      { _id: chatId },
      { $addToSet: { 'messages.$[msg].readBy': userId } },
      { arrayFilters: [{ 'msg.readBy': { $ne: userId } }] }
    );
  }
}

export default ChatRepo;
