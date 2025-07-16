import express from 'express';
import config from './config/config';
import bodyParser from 'body-parser';
import { connectDb } from './config/connectDb';
import http from 'http';
import { Server } from 'socket.io';
import { registerRoutes } from './routes/RegisterRoutes';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Soketio
// setupUserSocket(io);

// Database connection
connectDb();

// Register routes
registerRoutes(app);

// Setup server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
