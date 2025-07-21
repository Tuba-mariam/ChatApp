import ChatNameSpace from '../interfaces/ChatInterface';
import ChatModel from '../models/ChatFunctionalityModel/ChatModel';


class ChatRepo {
    static async getMessage(sender :string, receiver:string) {
    return await ChatModel.find({sender , receiver }).sort({ createdAt: 1 })

  }
     static async markMessageAsRead(messages:string,) {
    return await ChatModel.findById({messages})

  }
}
export default ChatRepo