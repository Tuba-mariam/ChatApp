import { ObjectId } from 'mongoose';
import UserNameSpace from './UserInterface';

declare namespace NotificationNameSpace {
  interface IModel {
    _id: string;
    sender: ObjectId | UserNameSpace.IModel;
    receiver: ObjectId | UserNameSpace.IModel;
    message: ObjectId | null;
    group: ObjectId | null;
    type: string;
    title: string;
    body: string;
    isRead: boolean;
  }

  interface ICreate {
    sender: string;
    receiver: string;
    message: string;
    group: string;
    type: string;
    title: string;
    body: string;
  }
}

export default NotificationNameSpace;
