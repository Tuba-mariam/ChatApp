import { ObjectId } from 'mongoose';
import UserNameSpace from './User.interface';

declare namespace ChatNameSpace {
  export interface IModel {
    _id: string;
    sender: ObjectId | UserNameSpace.IModel;
    receiver: ObjectId;
    message: string;
    isRead?: boolean;
  }
}

export default ChatNameSpace;
