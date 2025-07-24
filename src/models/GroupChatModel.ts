import mongoose, { Schema } from 'mongoose';
import ChatGroupNameSpace from '../interfaces/ChatGroupInterface';

export const chatgroupSchema = new mongoose.Schema<ChatGroupNameSpace.IModel>(
  {
    groupId: { type: Schema.Types.ObjectId, ref: 'ChatGroup', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChatGroupModel = mongoose.model('ChatGroup', chatgroupSchema);

export default ChatGroupModel;
