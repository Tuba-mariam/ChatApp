import mongoose from 'mongoose';
import ChatNameSpace from '../Interfaces/ChatInterface';
import MessageTypeEnum from '../Enum/MessageEnumType';

export const messagesSchema = new mongoose.Schema<ChatNameSpace.Message>({
  content: { type: String, required: true },
  type: { type: String, enum: MessageTypeEnum, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
});
export const groupInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const chatSchema = new mongoose.Schema<ChatNameSpace.IModel>(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [messagesSchema],
    groupInfo: groupInfoSchema,
    isGroup: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model('Chat', chatSchema);

export default ChatModel;
