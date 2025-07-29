import { body } from 'express-validator';

const sendNotificationValidation = [
  body('content')
    .notEmpty()
    .withMessage('Notification content is required')
    .isString()
    .withMessage('Content must be a string'),
];

export default sendNotificationValidation;
