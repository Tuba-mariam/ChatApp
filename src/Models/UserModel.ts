import mongoose from 'mongoose';
import UserNameSpace from '../Interfaces/UserInterface';

export const userSchema = new mongoose.Schema<UserNameSpace.IModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String },
    otp: { type: String },
    isVerified: { type: Boolean, default: false, required: false },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
