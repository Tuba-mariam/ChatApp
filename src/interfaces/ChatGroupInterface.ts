import { ObjectId } from 'mongoose';

declare namespace ChatGroupNameSpace {
  export interface IModel {
    _id: string;
    groupId: ObjectId;
    sender: ObjectId;
    message: string;
    isRead: boolean;
  }
}

export default ChatGroupNameSpace;
