import mongoose from 'mongoose';
import ChatNameSpace from '../interfaces/ChatInterface';
import ChatModel from '../models/ChatFunctionalityModel/ChatModel';

class ChatRepo {
  static async sendMessage(sender:string , receiver : string , message:string) {
    return await ChatModel.create(sender,receiver,message);
  }
  static async getMessage(sender: string, receiver: string) {
    return await ChatModel.find({ sender, receiver }).populate('sender').populate('reciever')
  }
  static async markMessageAsRead(messages: string) {
    return await ChatModel.findOneAndUpdate({ _id: messages, isRead: false }, { isRead: true }, { new: true });
  }
}
export default ChatRepo;
