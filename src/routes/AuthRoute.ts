import { Router } from 'express';

import AuthController from '../Controllers/AuthController';
import sendOtpaValidation from '../validators/auth/RegisterValidator';


const router = Router();

router.post('/send-otp', sendOtpaValidation, AuthController.SendOtp);
router.post('/verify-otp', sendOtpaValidation, AuthController.verifyOtp);
router.post('/set-password', sendOtpaValidation, AuthController.createPassword);
router.post('/login',  AuthController.login);

export default router;
