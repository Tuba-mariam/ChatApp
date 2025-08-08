import { Request, Response } from 'express';
import { generateOtp, otpExpiresAt } from '../Utils/OtpHelper';
import UserModel from '../Models/UserModel';
import UserRepo from '../Repos/UserRepo';
import GenericNameSpace from '../Interfaces/GenericInterface';
import createPasswordHash from '../Utils/CreatePasswordHash';
import matchPassword from '../Utils/MatchPassword';
import jwt from 'jsonwebtoken';
import AuthNameSpace from '../Interfaces/AuthInterface';
import UserNameSpace from '../Interfaces/UserInterface';
// import sendOTP from '../Utils/Twilio';
import config from '../Config/config';

class AuthController {
  public static async sendOtp(req: Request, res: Response): Promise<void> {
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
      await UserRepo.createUser(phoneNumber, otp, otpExpires);
      // await sendOTP(phoneNumber, otp);

      res.json({
        success: true,
        data: { otp },
        message: 'OTP generate successfully',
      });
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Internal server error',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber } = req.params;
      const user = await UserRepo.findUserByQuery({ phoneNumber, isVerified: true });
      if (!user) {
        res.status(400).json({
          success: false,
          message: 'User not found Please Register First',
        });
        return;
      }

      const otp = generateOtp();
      const otpExpires = otpExpiresAt();
      await UserRepo.updateUserByQuery({ phoneNumber }, { otp, otpExpiresAt: otpExpires });
      res.json({
        success: true,
        data: { otp },
        message: 'OTP  resend  successfully',
      });
    } catch (error) {
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
      const user = await UserRepo.findUserByQuery({ phoneNumber, otp });
      if (!user) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'OTP is invalid!',
        };
        res.status(500).json(errorResponse);
      }

      await UserRepo.updateUserByQuery({ phoneNumber }, { isVerified: true });

      const Response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Otp verified successfully',
      };
      res.status(500).json(Response);
      return;
    } catch (error) {
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Internal server error',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async setPassword(req: Request, res: Response): Promise<void> {
    const { password, phoneNumber } = req.body;

    try {
      const dbUser = await UserRepo.findUserByQuery({ phoneNumber });

      if (!dbUser) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'User not found',
        };
        res.status(404).json(errorResponse);
        return;
      }

      if (!dbUser.isVerified) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'otp is not verified',
        };
        res.status(404).json(errorResponse);
        return;
      }

      const passwordHash = await createPasswordHash(password);
      await UserRepo.updateUserByQuery({ phoneNumber }, { password: passwordHash });

      const response: GenericNameSpace.IApiResponse = {
        success: true,
        message: 'Password set successfully',
      };
      res.status(200).json(response);
    } catch (error) {
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
      const user = await UserRepo.findUserByQuery({ phoneNumber });
      if (!user) {
        const errorResponse: GenericNameSpace.IApiResponse = {
          success: false,
          message: 'Phone Number is invalid',
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

      const token = jwt.sign(user, config.jwtSecret, {
        expiresIn: '24h',
      });
      const response: GenericNameSpace.IApiResponse<AuthNameSpace.ILoginResponse> = {
        success: true,
        message: 'Login successful!',
        data: {
          token,
          user,
        },
      };
      res.json(response);
    } catch (error) {
      console.log(error);
      const errorResponse: GenericNameSpace.IApiResponse = {
        success: false,
        message: 'Internal server error',
      };
      res.status(500).json(errorResponse);
    }
  }

  public static async getProfile(req: AuthNameSpace.IRequest, res: Response): Promise<void> {
    const user = req.user as UserNameSpace.IModel;

    const response: GenericNameSpace.IApiResponse<UserNameSpace.IModel> = {
      success: true,
      message: 'profile fetch successful!',
      data: user,
    };
    res.json(response);
  }
}

export default AuthController;
