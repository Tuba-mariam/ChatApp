import { ObjectId } from 'mongoose';

declare namespace GroupNameSpace {
  export interface IModel {
    _id: string;
    name: string;
    members: ObjectId;
    createdBy: ObjectId;
  }
}

export default GroupNameSpace;
