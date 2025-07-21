import UserModel from '../models/AuthModel/UserModel';

class UserRepo {
  static async createOtp(phoneNumber: string, otp: string, otpExpires: Date) {
    return await UserModel.create({ phoneNumber, otp, otpExpiresAt: otpExpires });
  }
  static async findOtp(phoneNumber: string, otp: string) {
    return await UserModel.findOne({ phoneNumber, otp });
  }
  static async createpass(phoneNumber: string) {
    return await UserModel.findOne({ phoneNumber });
  }
  public static async getUserByPhoneNumber(phoneNumber: string) {
    return await UserModel.findOne({ phoneNumber });
  }
}

export default UserRepo;
