import { Server } from 'socket.io';
import NotificationRepo from '../../Repos/NotificationRepo';

const setUpNotificationSocket = (io: Server): void => {
  io.on('connection', socket => {
    console.log('User connected');

    socket.on('get-Notification', async data => {
      const { userId } = data;
      try {
        const notification = await NotificationRepo.getAllNotification(userId);
        socket.emit('receive-notification', notification);
      } catch (error) {
        socket.emit('error', 'Failed to fetch messages');
      }
    });
  });
};
export default setUpNotificationSocket;
