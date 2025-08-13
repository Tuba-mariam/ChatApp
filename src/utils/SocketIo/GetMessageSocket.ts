import { Server } from 'socket.io';
import ChatRepo from '../../Repos/ChatRepo';
import ChatNameSpace from '../../Interfaces/ChatInterface';
import GenericNameSpace from '../../Interfaces/GenericInterface';

const setUpMessageSocket = (io: Server): void => {
  io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('user', async data => {
      const { userId } = data;
      try {
        const unreadCounts = await ChatRepo.findAllByMember(userId);
        const Response: GenericNameSpace.IApiResponse<ChatNameSpace.IModel[]> = {
          success: true,
          data: unreadCounts,
          message: 'Unread counts fetched successfully',
        };
        socket.emit('unread-counts', Response);
      } catch (error) {
        socket.emit('error', 'Failed to fetch unread counts');
      }
    });

    socket.on('send-message', async data => {
      const { chatId, message } = data;
      try {
        const updatedChat = await ChatRepo.addMessageToChat(chatId, message);
        socket.emit('updateUnreadChat', updatedChat);
      } catch (error) {
        socket.emit('error', 'Failed to fetch unread counts');
      }
    });

    socket.on('get-message', async data => {
      const { chatId } = data;
      try {
        const updateMessage = await ChatRepo.findByQuery({ _id: chatId });
        socket.emit('receive-Message', updateMessage);
      } catch (error) {
        socket.emit('error', 'Failed to fetch unread counts');
      }
    });
  });
};

export default setUpMessageSocket;
