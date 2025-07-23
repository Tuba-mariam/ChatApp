import mongoose from 'mongoose';
import UserNameSpace from '../../interfaces/User.interface';

export const userSchema = new mongoose.Schema<UserNameSpace.IModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String },
    otp: { type: String },
    otpExpiresAt: { type: Date },
   },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
