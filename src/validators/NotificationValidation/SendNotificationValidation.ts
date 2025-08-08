import { body, param } from 'express-validator';
import NotificationTypeEnum from '../../Enum/NotificationTypeEnum';

const sendNotificationValidation = [
  param('sender')
    .notEmpty()
    .withMessage('Sender ID is required')
    .isMongoId()
    .withMessage('Sender ID must be a valid Mongo ID'),

  body('type')
    .notEmpty()
    .withMessage('Notification type is required')
    .isIn(Object.values(NotificationTypeEnum))
    .withMessage(`Type must be one of: ${Object.values(NotificationTypeEnum).join(', ')}`),

  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),

  body('body')
    .notEmpty()
    .withMessage('Body is required')
    .isLength({ max: 1000 })
    .withMessage('Body must be less than 1000 characters'),
];

export default sendNotificationValidation;
