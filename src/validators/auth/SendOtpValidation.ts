import { body } from 'express-validator';

export const sendOtpValidation = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('en-PK')
    .withMessage('Invalid phone number'),
];
