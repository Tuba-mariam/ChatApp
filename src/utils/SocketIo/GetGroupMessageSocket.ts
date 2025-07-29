import { Server } from 'socket.io';
import ChatGroupRepo from '../../repos/GroupChatRepo';
import GroupChatRepo from '../../repos/GroupChatRepo';

const setUpSendGroupMessageSocket = (io: Server) => {
  io.on('connection', socket => {
    console.log('User connected');

    socket.on('get-Group-messages', async data => {
      const { groupId } = data;
      try {
        const messages = await GroupChatRepo.getGroupChat(groupId);
        socket.emit('receive-messages', messages);
      } catch (error) {
        socket.emit('error', 'Failed to fetch messages');
      }
    });
  });
};
export default setUpSendGroupMessageSocket;
