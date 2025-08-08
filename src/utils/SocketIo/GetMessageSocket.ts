// import { Server } from 'socket.io';
// import ChatRepo from '../../Repos/ChatRepo';

// const setUpSendMessageSocket = (io: Server): void => {
//   io.on('connection', socket => {
//     console.log('User connected');

//     socket.on('get-messages', async data => {
//       const { conversationId } = data;
//       try {
//         const messages = await ChatRepo.getMessage(conversationId);
//         socket.emit('receive-messages', messages);
//       } catch (error) {
//         socket.emit('error', 'Failed to fetch messages');
//       }
//     });
//   });
// };
// export default setUpSendMessageSocket;
