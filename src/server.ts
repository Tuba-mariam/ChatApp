import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import { registerRoutes } from './Routes/RegistersRoutes';
import { connectDb } from './Config/connectDb';
import config from './Config/config';
import setUpMessageSocket from './Utils/SocketIo/GetMessageSocket';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Socket-io
setUpMessageSocket(io);

// Database connection
connectDb();

// Register routes
registerRoutes(app);

// Setup server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
