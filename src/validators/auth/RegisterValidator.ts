import { body } from 'express-validator';

const sendOtpaValidation = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any', { strictMode: false }) 
    .withMessage('Invalid phone number format')
    .isLength({min: 11 , max: 11 })
    .withMessage('Phone number must be 11 digits'),

    

];

export default sendOtpaValidation;
