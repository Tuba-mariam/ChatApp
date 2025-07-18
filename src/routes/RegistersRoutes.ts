import AuthRoute from './AuthRoute';

import { Express } from 'express';

export const registerRoutes = (app: Express) => {
  app.use('/api/v1/auth', AuthRoute);
   app.use('/api/v1/users', AuthRoute);
  app.use('/api/v2/chat', AuthRoute);
   

}

