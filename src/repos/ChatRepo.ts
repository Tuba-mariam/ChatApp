import mongoose from 'mongoose';
import ChatNameSpace from '../interfaces/ChatInterface';
import ChatModel from '../models/ChatFunctionalityModel/ChatModel';

class ChatRepo {
  static async sendMessage(data: ChatNameSpace.IModel) {
    return await ChatModel.create(data);
  }
  static async getMessage(sender: string, receiver: string) {
    return await ChatModel.find({ sender, receiver }).sort({ createdAt: 1 });
  }
  static async markMessageAsRead(messages: string) {
      return await ChatModel.findOneAndUpdate({_id: messages, isRead: false },
    { isRead: true },                  
    { new: true }                   
  );
  }
}
export default ChatRepo;
