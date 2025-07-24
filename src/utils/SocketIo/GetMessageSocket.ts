import { Server } from 'socket.io';
import ChatRepo from '../../repos/ChatRepo';

const setUpSendMessageSocket = (io: Server): void => {
  io.on('connection', socket => {
    console.log('User connected');
   
    socket.on('get-messages', async data => {
      const { sender, receiver } = data
      try {
        const messages = await ChatRepo.getMessage(sender, receiver);
        socket.emit('receive-messages', messages);
      } catch (error) {
        socket.emit('error', 'Failed to fetch messages');
      }
    });
  });
};
export default setUpSendMessageSocket;
