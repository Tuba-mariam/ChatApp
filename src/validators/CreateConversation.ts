import { body } from 'express-validator';

export const createConversationValidation = [
  body('participant').custom(value => {
    if (typeof value !== 'string') {
      throw new Error('participant ID must be a string');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error('participant ID must be a valid Mongo ID');
    }
    return true;
  }),
];
