import { body } from 'express-validator';

export const addMemberValidation = [
  body('member')
    .notEmpty()
    .withMessage('Group ID is required')
    .isMongoId()
    .withMessage('Group ID must be a valid Mongo ID'),
];
