import { body } from 'express-validator';

const sendNotificationValidation = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid Mongo ID'),

  body('content')
    .notEmpty()
    .withMessage('Notification content is required')
    .isString()
    .withMessage('Content must be a string'),
];

export default sendNotificationValidation;
