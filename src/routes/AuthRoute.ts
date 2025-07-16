import { Router } from 'express';
import sendOtpaValidation from '../validators/auth/sendOtpValidator';
import AuthController from '../Controllers/AuthController';



const router = Router();

router.post('/send-otp', sendOtpaValidation,AuthController.sendOtp);


export default router;
