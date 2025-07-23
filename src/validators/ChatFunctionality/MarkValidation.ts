import { body } from 'express-validator';

const  markMessageValidation = [
   body('messagesId')
    .notEmpty()
    .withMessage('Message ID is required')
    .isMongoId()
    .withMessage('Message ID must be a valid Mongo ID'),
];

export default   markMessageValidation;