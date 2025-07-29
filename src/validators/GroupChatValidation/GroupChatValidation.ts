import { body } from 'express-validator';

const sendGroupChatValidation = [
  body('message')
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters'),
];

export default sendGroupChatValidation;
