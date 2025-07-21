import mongoose from 'mongoose';
import NotificationNameSpace from '../../interfaces/NotificationInterface';

export const NotificationSchema = new mongoose.Schema<NotificationNameSpace.IModel>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export default NotificationModel;
