import { body } from 'express-validator';

export const removeMemberValidation = [
  body('member').custom(value => {
    if (typeof value !== 'string') {
      throw new Error('Member ID must be a string (not an array)');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error('Member ID must be a valid Mongo ID');
    }
    return true;
  }),
];
