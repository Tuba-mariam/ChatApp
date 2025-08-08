import { Express } from 'express';
import AuthRoute from './AuthRoute';
import ChatRoute from './ChatRoutes';
import NotificationRoute from './NotificationRoute';
import GroupRoute from './GroupRoute';
import ConversationRoute from './ConversationRoute';

export const registerRoutes = (app: Express) => {
  app.use('/api/v1/auth', AuthRoute);
  app.use('/api/v1/users', AuthRoute);
  app.use('/api/v1/chats', ChatRoute);
  app.use('/api/v1/notifications', NotificationRoute);
  app.use('/api/v1/groups', GroupRoute);
  app.use('/api/v1/conversation', ConversationRoute);
};
