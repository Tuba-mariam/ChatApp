import { body } from 'express-validator';

const getMessageValidation = [
  body('sender')
    .notEmpty()
    .withMessage('Sender ID is required')
    .isMongoId()
    .withMessage('Sender ID must be a valid Mongo ID'),

  body('receiver')
    .notEmpty()
    .withMessage('Receiver ID is required')
    .isMongoId()
    .withMessage('Receiver ID must be a valid Mongo ID'),
];

export default getMessageValidation;
