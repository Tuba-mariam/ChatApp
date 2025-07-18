import { Router } from 'express';

import AuthController from '../Controllers/UserManagement/AuthController';
import sendOtpaValidation from '../validators/auth/RegisterValidator';
import loginValidation from '../validators/auth/LoginValidation';
import setPassValidation from '../validators/auth/SetPassValidation';


const router = Router();

router.post('/send-otp', sendOtpaValidation, AuthController.SendOtp);
router.post('/verify-otp', sendOtpaValidation, AuthController.verifyOtp);
router.post('/set-password', setPassValidation, AuthController.createPassword);
router.post('/login', loginValidation, AuthController.login);
router.get('/get-profile', loginValidation, AuthController.getProfile);

export default router;
