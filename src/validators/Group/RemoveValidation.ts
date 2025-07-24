import { body } from 'express-validator';

export const removeMemberValidation = [
  body('groupId')
    .notEmpty()
    .withMessage('Group ID is required')
    .isMongoId()
    .withMessage('Group ID must be a valid Mongo ID'),

  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid Mongo ID'),
];
