import { body } from 'express-validator';

export const createGroupValidation = [
  body('groupInfo.title')
    .notEmpty()
    .withMessage('Group title is required')
    .isString()
    .withMessage('Group title must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Group title must be between 3 and 100 characters'),

  body('groupInfo.image').optional().isURL().withMessage('Group image must be a valid URL'),

  body('groupInfo.isGroup').equals('true').withMessage('isGroup must be true'),

  body('members').isArray({ min: 2 }).withMessage('Members must be an array with at least 2 user IDs'),

  body('members.*').isMongoId().withMessage('Each member must be a valid Mongo ID'),
];
