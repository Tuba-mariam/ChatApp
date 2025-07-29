import { ObjectId } from 'mongoose';
import UserNameSpace from './User.interface';

declare namespace GroupChatNameSpace {
  export interface IModel {
    _id: string;
    groupId: ObjectId;
    sender: ObjectId;
    message: string;
    ReadBy: ObjectId[] | UserNameSpace.IModel;
  }
}

export default GroupChatNameSpace;
