import AuthRoute from './AuthRoute';

import { Express } from 'express';

export const registerRoutes = (app: Express) => {
  app.use('/api/v1/auth', AuthRoute);
   

}

