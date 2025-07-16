
import { UserModel } from '../models';


class UserRepo {
  static async createOtp(phoneNumber: string, otp: string,  otpExpires: Date) {
  return await UserModel.create({ phoneNumber, otp, otpExpiresAt:otpExpires});
}

 
}

export default UserRepo;
