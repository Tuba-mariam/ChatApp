import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserNameSpace from '../Interfaces/UserInterface';

declare namespace AuthNameSpace {
  export interface IRequest extends Request {
    user?: JwtPayload | UserNameSpace.IModel;
  }
  interface TSignup extends UserNameSpace.ICreate {}

  interface ILogin {
    phoneNumber: string;
    password: string;
  }

  interface ILoginResponse {
    token: string;
    user: UserNameSpace.IModel;
  }
}

export default AuthNameSpace;
