import { Request, Response } from 'express';
import GenericNameSpace from '../interfaces/Generic.interface';
import UserRepo from '../repos/UserRepo';
import { generateOtp, otpExpiresAt } from '../utils/OtpHelper';
import UserModel from '../models/AuthModel/UserModel';
import createPasswordHash from '../utils/CreatePasswordHash';
import AuthNameSpace from '../interfaces/Auth.interface';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import matchPassword from '../utils/MatchPassword';
import UserNameSpace from '../interfaces/User.interface';



// import sendOTP from '../utils/Twilio';

class AuthController {
  public static async SendOtp(req: Request, res: Response): Promise<void> {
    const { phoneNumber } = req.body;
    const otp = generateOtp();
    const otpExpires = otpExpiresAt();

    try {
      const existingUser = await UserModel.findOne({ phoneNumber });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Phone number already registered',
        });
        return;
      }
      await UserRepo.createOtp(phoneNumber, otp, otpExpires);
      // await sendOTP(phoneNumber, otp);
      res.json({
        success: true,
        data: { otp },
        message: 'OTP generate successfully',
      });
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Internal server error',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async verifyOtp(req: Request, res: Response): Promise<void> {
    const { phoneNumber, otp } = req.body;
    try {
      const user = await UserRepo.findOtp(phoneNumber, otp);
      if (!user) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Otp is invalid',
        };
        res.status(500).json(errorResponse);
      }
      const Response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Otp verified successfully',
      };
      res.status(500).json(Response);
      return;
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Internal server error',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async createPassword(req: Request, res: Response): Promise<void> {
    const { password, phoneNumber } = req.body;

    try {
      const foundUser = await UserRepo.createpass(phoneNumber);

      if (!foundUser) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'User not found',
        };
        res.status(404).json(errorResponse);
        return;
      }
      const passwordHash = await createPasswordHash(password);
      foundUser.password = passwordHash;
      await foundUser.save();

      const response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Password set successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Internal server error',
      };
      res.status(500).json(errorResponse);
    }
  }
  public static async login(req: Request, res: Response): Promise<void> {
      const { phoneNumber, password } = req.body;
  
      try {
        const user = await UserRepo.getUserByPhoneNumber(phoneNumber);
        if (!user) {
          const errorResponse: GenericNameSpace.IApiResponse = {
            success: false,
            message: 'Email is invalid',
          };
          res.status(400).json(errorResponse);
          return;
        }
  
        const isPasswordMatched = await matchPassword(password, user.password);
        if (!isPasswordMatched) {
          const errorResponse: GenericNameSpace.IApiResponse = {
            success: false,
            message: 'Password is invalid',
          };
          res.status(400).json(errorResponse);
          return;
        }
  
       const { password: pass, ...resUser } = user

      const token = jwt.sign(resUser, config.jwtSecret, {
        expiresIn: '24h',
      });
      const response: GenericNameSpace.IApiResponse<AuthNameSpace.ILoginResponse> = {
        success: true,
        message: 'Login successful!',
        data:{
          token,
          user: resUser,
        },
        };
        res.json(response);
      } catch (error) {
        console.log(error)
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Internal server error',
        };
        res.status(500).json(errorResponse);
      }
    }
}

export default AuthController;
