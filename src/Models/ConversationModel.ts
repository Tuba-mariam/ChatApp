import mongoose from 'mongoose';
import ConversationNameSpace from '../Interfaces/ConversationInterface';

export const ConversationSchema = new mongoose.Schema<ConversationNameSpace.IModel>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

export default ConversationModel;
