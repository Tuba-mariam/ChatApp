import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import AuthNameSpace from '../interfaces/Auth.interface';
import UserNameSpace from '../interfaces/User.interface';



const authenticateJwt = (req: AuthNameSpace.IRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized, JWT token is required' });
    return;
  }
  const token = authHeader.split(' ')[1];


 

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as UserNameSpace.IModel
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error });
  }
};

export default authenticateJwt;
