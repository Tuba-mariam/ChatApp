import { param } from 'express-validator';

const markAsReadValidation = [
  param('chatId').notEmpty().withMessage('Chat ID is required').isMongoId().withMessage('Invalid Chat ID'),
];

export default markAsReadValidation;
