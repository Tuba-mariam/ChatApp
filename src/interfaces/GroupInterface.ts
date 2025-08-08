import { ObjectId } from 'mongoose';
import UserNameSpace from './UserInterface';

declare namespace GroupNameSpace {
  export interface IModel {
    _id: string;
    name: string;
    members: ObjectId[] | UserNameSpace.IModel[];
    createdBy: ObjectId | UserNameSpace.IModel;
  }
}

export default GroupNameSpace;
