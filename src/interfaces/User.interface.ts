

declare namespace UserNameSpace {
  interface IModel {
    _id: string;
    phoneNumber: string
            otp: String 
    otpExpiresAt: Date
  }

  interface ICreate {
    phoneNumber: string
            otp: String 
    otpExpiresAt: Date
  
  }
}

export default UserNameSpace;
