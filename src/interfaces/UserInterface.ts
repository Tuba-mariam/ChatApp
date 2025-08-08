declare namespace UserNameSpace {
  export interface IModel {
    _id: string;
    phoneNumber: string;
    password: string;
    isVerified: boolean;
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
