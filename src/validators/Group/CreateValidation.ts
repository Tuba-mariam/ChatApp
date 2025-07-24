import { body } from 'express-validator';

export const createGroupValidation = [
  body('name').notEmpty().withMessage('Group name is required'),

  body('members').isArray({ min: 1 }).withMessage('Members must be a non-empty array of user IDs'),

  body('members.*').isMongoId().withMessage('Each member must be a valid Mongo ID'),

  body('createdBy')
    .notEmpty()
    .withMessage('Creator ID is required')
    .isMongoId()
    .withMessage('Creator ID must be a valid Mongo ID'),
];
