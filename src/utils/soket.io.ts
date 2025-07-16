// import { Server } from 'socket.io';
// import UserRepo from '../repos/UserRepo';

// const setupUserSocket = (io: Server): void => {
//   io.on('connection', socket => {
//     console.log('User connected');

//     socket.on('update-location', async payload => {
//       console.log('Received location update');
//       const { userId, latitude, longitude } = payload;

//       try {
//         await UserRepo.updateLocation(userId, { latitude, longitude });
//         console.log(`Updated location for user ${userId}`);
//       } catch (error) {
//         console.error('Error updating user location:', error);
//       }
//     });

//     const payload = {
//       userId: '68676e30c60c5c8901d6b2a5',
//       latitude: 24.8607,
//       longitude: 67.0011,
//     };

//     socket.emit('update-location', payload);
//   });
// };


// export default setupUserSocket;