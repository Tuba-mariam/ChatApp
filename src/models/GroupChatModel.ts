import mongoose, { Schema } from 'mongoose';
import GroupChatNameSpace from '../interfaces/GroupChatInterface';

export const groupChatSchema = new mongoose.Schema<GroupChatNameSpace.IModel>(
  {
    groupId: { type: Schema.Types.ObjectId, ref: 'ChatGroup', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    ReadBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const GroupChatModel = mongoose.model('GroupChat', groupChatSchema);

export default GroupChatModel;
