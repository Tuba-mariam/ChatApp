import { ObjectId } from "mongoose";


declare namespace ChatNameSpace {

  export interface IModel  {
    _id: string;
    sender: ObjectId;
    receiver: ObjectId;
    content: string;
    isRead?: boolean;
  
  }
   export interface IChat {
     sender?: string;
    receiver?: string;
   }
}

export default ChatNameSpace;