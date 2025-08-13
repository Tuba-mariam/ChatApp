import { Express } from 'express';
import AuthRoute from './AuthRoute';
import ChatRoute from './ChatRoutes';
import GroupRoute from './GroupRoute';

export const registerRoutes = (app: Express) => {
  app.use('/api/v1/auth', AuthRoute);
  app.use('/api/v1/users', AuthRoute);
  app.use('/api/v1/chats', ChatRoute);
  app.use('/api/v1/groups', GroupRoute);
};
