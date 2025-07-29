import { FilterQuery, UpdateQuery } from 'mongoose';
import UserModel from '../models/AuthModel/UserModel';
import UserNameSpace from '../interfaces/User.interface';

class UserRepo {
  static async createUser(phoneNumber: string, otp: string, otpExpires: Date) {
    return await UserModel.create({ phoneNumber, otp, otpExpiresAt: otpExpires });
  }
  static async findUserByQuery(query: FilterQuery<UserNameSpace.IModel>) {
    return await UserModel.findOne(query).lean();
  }
  static async updateUserByQuery(query: FilterQuery<UserNameSpace.IModel>, payload: UpdateQuery<UserNameSpace.IModel>) {
    await UserModel.findOneAndUpdate(query, payload);
  }
}

export default UserRepo;
