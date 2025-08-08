import { FilterQuery, UpdateQuery } from 'mongoose';
import UserNameSpace from '../Interfaces/UserInterface';
import UserModel from '../Models/UserModel';

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
