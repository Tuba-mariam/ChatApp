import { param } from 'express-validator';
import ChatModel from '../../Models/ChatModel';

const markAsReadValidation = [
  param('chatId')
    .notEmpty()
    .withMessage('Chat ID is required')
    .isMongoId()
    .withMessage('Invalid Chat ID')
    .bail()
    .custom(async chatId => {
      const exists = await ChatModel.exists({ _id: chatId });
      if (!exists) {
        throw new Error('Chat not found with the given ID');
      }
      return true;
    }),
];

export default markAsReadValidation;
