import { ObjectId } from 'mongoose';
import UserNameSpace from './UserInterface';

declare namespace ConversationNameSpace {
  export interface IModel {
    _id: string;
    participants: ObjectId[] | UserNameSpace.IModel[];
  }
}

export default ConversationNameSpace;
