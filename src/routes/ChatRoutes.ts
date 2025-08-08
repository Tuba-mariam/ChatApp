import { Router } from 'express';
import sendMessageValidation from '../validators/ChatFunctionality/SendValidation';
import requestValidationMiddleware from '../Middlewares/RequestValidation.Middleware';
import authenticateJwt from '../Middlewares/AuthenticateJwt.Middlewares';
import ChatController from '../Controllers/ChatController';
import markAsReadValidation from '../validators/ChatFunctionality/MarkAsReadValidation';

const router = Router();

router.post(
  '/send-message',
  authenticateJwt,
  sendMessageValidation,
  requestValidationMiddleware,
  ChatController.sendMessage
);
router.get('/get-message/:chatId', ChatController.getMessages);
router.put(
  '/mark-as-read/:chatId',
  authenticateJwt,
  markAsReadValidation,
  requestValidationMiddleware,
  ChatController.markAsRead
);

export default router;
