import { Request, Response } from 'express';
import GenericNameSpace from '../interfaces/Generic.interface';
import UserRepo from '../repos/UserRepo';
import { generateOtp, otpExpiresAt } from '../utils/OtpHelper';
import sendOTP from '../utils/Twilio';

class AuthController {
  public static async sendOtp(req: Request, res: Response) {
    const { phoneNumber } = req.body;
    const otp = generateOtp();
    const otpExpires = otpExpiresAt();

    try {
      const user = await UserRepo.createOtp(phoneNumber, otp, otpExpires);
      await sendOTP(phoneNumber, otp);
      res.json({
        success: true,
        data: user,
        message: 'OTP sent successfully',
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
}

export default AuthController;
