import { Router } from 'express';

import AuthController from '../Controllers/UserManagement/AuthController';
import sendOtpaValidation from '../validators/auth/RegisterValidator';
import loginValidation from '../validators/auth/LoginValidation';
import setPassValidation from '../validators/auth/SetPassValidation';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';



const router = Router();

router.post('/send-otp', sendOtpaValidation,requestValidationMiddleware, AuthController.SendOtp);
router.get('/resend-otp/:phoneNumber',  AuthController.reSendOtp);
router.post('/verify-otp', sendOtpaValidation,requestValidationMiddleware, AuthController.verifyOtp);
router.post('/set-password', setPassValidation,requestValidationMiddleware, AuthController.createPassword);
router.post('/login', loginValidation,requestValidationMiddleware, AuthController.login);
router.get('/get-profile', authenticateJwt,  AuthController.getProfile);

export default router;
