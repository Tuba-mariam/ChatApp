import mongoose from 'mongoose';
import ChatNameSpace from '../../interfaces/ChatInterface';

export const chatSchema = new mongoose.Schema<ChatNameSpace.IModel>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model('Chat', chatSchema);

export default ChatModel;
