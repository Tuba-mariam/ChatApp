import { body } from 'express-validator';

export const removeMemberValidation = [
  body('member')
    .notEmpty()
    .withMessage('Group ID is required')
    .isMongoId()
    .withMessage('Group ID must be a valid Mongo ID'),
];
