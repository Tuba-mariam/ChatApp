import UserNameSpace from '../interfaces/User.interface';
import UserModel from '../models/AuthModel/UserModel';

class UserRepo {
  static async createOtp(phoneNumber: string, otp: string, otpExpires: Date): Promise<UserNameSpace.IModel | null> {
    return await UserModel.create({ phoneNumber, otp, otpExpiresAt: otpExpires });
  }
  static async findOtp(phoneNumber: string, otp: string): Promise<UserNameSpace.IModel | null> {
    return await UserModel.findOne({ phoneNumber, otp });
  }
  static async createpass(phoneNumber: string): Promise<UserNameSpace.IModel | null>{
    return await UserModel.findOne({ phoneNumber });
  }
   public static async getUserByPhoneNumber(phoneNumber: string): Promise<UserNameSpace.IModel | null> {
      return await UserModel.findOne({phoneNumber})
    }
    
  
}

export default UserRepo;
