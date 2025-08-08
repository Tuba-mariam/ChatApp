import { Document, ObjectId } from 'mongoose';
import MessageTypeEnum from '../Enum/MessageEnumType';

declare namespace ChatNameSpace {
  interface IModel extends Document {
    _id: string;
    members: ObjectId[];
    messages: ChatNameSpace.Message[];
    isGroup: boolean;
    groupInfo?: {
      admin: ObjectId;
      title: string;
      image: string;
    };
  }

  interface Message {
    content: string;
    type: MessageTypeEnum;
    sender: ObjectId;
    readBy: ObjectId[];
    createdAt: Date;
  }

  interface SendMessageData {
    value: string;
    type: MessageTypeEnum;
    sender: ObjectId;
    receiverId?: ObjectId | string;
    chatId?: ObjectId;
  }
}

export default ChatNameSpace;
