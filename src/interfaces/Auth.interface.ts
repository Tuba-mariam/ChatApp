import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserNameSpace from './User.interface';

declare namespace AuthNameSpace {
  export interface IRequest extends Request {
    user?: JwtPayload | UserNameSpace.IModel;
  }
  interface TSignup extends UserNameSpace.ICreate {}

  interface ILogin {
    email: string;
    password: string;
  }
  interface ILoginResponse {
    token: string;
    user: Omit<UserNameSpace.IModel, 'password'>;
  }
}

export default AuthNameSpace;
