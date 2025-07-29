import { body } from 'express-validator';

const sendMessageValidation = [
  body('receiver')
    .notEmpty()
    .withMessage('Receiver ID is required')
    .isMongoId()
    .withMessage('Receiver ID must be a valid Mongo ID'),

  body('message')
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters'),
];

export default sendMessageValidation;
