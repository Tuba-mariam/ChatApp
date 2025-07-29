import { ObjectId } from 'mongoose';
import UserNameSpace from './User.interface';

declare namespace GroupNameSpace {
  export interface IModel {
    _id: string;
    name: string;
    members: ObjectId[] | UserNameSpace.IModel[];
    createdBy: ObjectId | UserNameSpace.IModel;
  }
}

export default GroupNameSpace;
