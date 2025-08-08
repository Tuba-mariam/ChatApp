import ChatModel, { chatSchema } from '../Models/ChatModel';
import ChatNameSpace from '../Interfaces/ChatInterface';
import mongoose from 'mongoose';

class ChatRepo {
  static async addMessageToChat(chatId: string, message: ChatNameSpace.Message) {
    return await ChatModel.findByIdAndUpdate(chatId, { $push: { messages: message } }, { new: true }).lean();
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
  static async getAllMessage(chatId: string) {
    return await ChatModel.findById(chatId).select('messages');
  }
  static async markMessageAsRead(userId: string, chatId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await ChatModel.updateOne(
      { _id: chatId },
      { $addToSet: { 'messages.$[msg].readBy': userObjectId } },
      {
        arrayFilters: [
          { 'msg.readBy': { $not: { $elemMatch: { $eq: userObjectId } } } }, // only messages where user not in readBy
        ],
      }
    );

    console.log('Update result:', result);

    // ✅ Add validation here
    if (result.modifiedCount === 0) {
      throw new Error('No messages were updated. User may have already read all messages or chat was not found.');
    }

    return true;
  }
}

// if (!data.receiverId && !data.chatId) {
//   throw Error('Invalid arguments');
// }
// const messages = {
//     value: data.value,
//           type: data.type,
//           sender: data.sender,
//           createdAt: new Date(),
// }

// if (data.chatId) {
//   const chat = await ChatModel.findByIdAndUpdate(
//     data.chatId,
//     {
//       $push: {messages: messages },
//     },
//     { upsert: true }
//   );

//   return chat;
// }

//   let  chat = await ChatModel.findOneAndUpdate(
//     { $size: 2, members: { $in: [data.receiverId, data.sender] } },

//   );

//   if (!chat) {
//     chat = await ChatModel.create({
//       members: [data.receiverId, data.sender],
//       messages: [
//        { messages }
//       ],
//     });
//   }

//   return chat;
// }

// public async sendMessage(data: ChatNameSpace.ICreate) {
//   return await ChatModel.create(data);
// }
// public async getMessage(conversationId: string) {
//   return await ChatModel.find({ conversation: conversationId }).populate('sender').populate('receiver');
// }

// async getChatByQuery(query: FilterQuery<ChatNameSpace.IModel>) {
//   console.log({ query });
//   return await ChatModel.find(query).populate('conversation').populate('group').lean().exec();
// }
// // static async updateChatByQuery(query: FilterQuery<ChatNameSpace.IModel>, payload: UpdateQuery<ChatNameSpace.IModel>) {
// //   await ChatModel.findOneAndUpdate(query, payload);
// // }

// // static async markMessageAsRead(receiver: string, conversationId: string) {
// //   return await ChatModel.updateMany({ receiver, conversationId }, { isRead: true });
// // }

export default ChatRepo;
