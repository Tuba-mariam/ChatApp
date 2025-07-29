import mongoose from 'mongoose';
import ChatNameSpace from '../interfaces/ChatInterface';
import ChatModel from '../models/ChatFunctionalityModel/ChatModel';

class ChatRepo {
  static async sendMessage(message: string, receiver: string, sender: string) {
    return await ChatModel.create({ message, receiver, sender });
  }
  static async getMessage(sender: string, receiver: string) {
    return await ChatModel.find({ sender, receiver }).populate('sender').populate('receiver');
  }
  static async markMessageAsRead(sender: string, receiver: string) {
    return await ChatModel.updateMany({ sender, receiver }, { isRead: true });
  }
}

export default ChatRepo;
