import { ObjectId } from 'mongoose';

declare namespace NotificationNameSpace {
  export interface IModel {
    _id: string;
    userId: ObjectId;
    content: string;
    isRead?: boolean;
  }

  export interface ICreate {
    userId: string;
    content: string;
  }
}

export default NotificationNameSpace;
