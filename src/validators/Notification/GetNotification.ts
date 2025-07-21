import { query } from 'express-validator';

const getNotificationValidation = [
  query('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid Mongo ID'),
];

export default getNotificationValidation;

