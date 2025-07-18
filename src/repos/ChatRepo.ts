import ChatNameSpace from '../interfaces/ChatInterface';
import ChatModel from '../models/ChatFunctionalityModel/ChatModel';


class ChatRepo {
  static async sendMessage(data: ChatNameSpace.IModel) {
    return await ChatModel.create(data);
  }
  static async getMessage(data: ChatNameSpace.IModel) {
    return await ChatModel.create(data);
  }
    static async getMessages(sender :string, receiver:string) {
    return await ChatModel.find({sender, receiver }).sort({ createdAt: 1 })

  }
}
export default ChatRepo