import { body } from 'express-validator';

const sendOtpaValidation = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any', { strictMode: false }) 
    .withMessage('Invalid phone number format')
    .isLength({ max: 11 })
    .withMessage('Phone number must be 11 digits'),

     body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits long')
    .isNumeric()
    .withMessage('OTP must be numeric'),

];

export default sendOtpaValidation;
