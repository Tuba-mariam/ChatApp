import { Router } from 'express';

import AuthController from '../Controllers/UserManagement/AuthController';
import sendOtpValidation from '../validators/auth/RegisterValidator';
import loginValidation from '../validators/auth/LoginValidation';
import setPassValidation from '../validators/auth/SetPassValidation';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';

const router = Router();

router.post('/send-otp', sendOtpValidation, requestValidationMiddleware, AuthController.sendOtp);
router.get('/resend-otp/:phoneNumber', AuthController.resendOtp);
router.post('/verify-otp', sendOtpValidation, requestValidationMiddleware, AuthController.verifyOtp);
router.post('/set-password', setPassValidation, requestValidationMiddleware, AuthController.setPassword);
router.post('/login', loginValidation, requestValidationMiddleware, AuthController.login);
router.get('/get-profile', authenticateJwt, AuthController.getProfile);

export default router;
