import mongoose from 'mongoose';
import GroupNameSpace from '../Interfaces/GroupInterface';

export const groupSchema = new mongoose.Schema<GroupNameSpace.IModel>(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const GroupModel = mongoose.model('Group', groupSchema);

export default GroupModel;
