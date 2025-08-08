import { body } from 'express-validator';

const sendMessageValidation = [
  body('content').notEmpty().withMessage('Message content is required'),
  body('type').notEmpty().withMessage('Message type is required'),
  body('chatId').optional().isMongoId().withMessage('Invalid chatId'),
  body('receiverId').optional().isMongoId().withMessage('Invalid receiverId'),
  body('members').optional().isArray().withMessage('Members must be an array'),
];

export default sendMessageValidation;
