import mongoose from 'mongoose';
import NotificationTypeEnum from '../Enum/NotificationTypeEnum';
import NotificationNameSpace from '../Interfaces/NotificationInterface';

export const NotificationSchema = new mongoose.Schema<NotificationNameSpace.IModel>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    type: { type: String, NotificationTypeEnum, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export default NotificationModel;
