import { Document } from 'mongoose';

declare namespace UserNameSpace {

  export interface IModel {
    _id: string;
    phoneNumber: string;
    password: string;
    otp?: string;
    otpExpiresAt?: Date;
  }

  export interface ICreate {
    phoneNumber: string;
  }

  export interface IPassword {
    password: string;
  }
}

export default UserNameSpace;
