import { Router } from 'express';
import ChatController from '../Controllers/ChatFunctionality/ChatController';
import sendMessageValidation from '../validators/ChatFunctionality/SendValidation';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';

const router = Router();

router.post(
  '/send-message',
  authenticateJwt,
  sendMessageValidation,
  requestValidationMiddleware,
  ChatController.sendMessage
);
router.get('/get-message/:receiver', authenticateJwt, ChatController.getMessages);
router.put('/mark-as-read/:sender', authenticateJwt, ChatController.markAsRead);

export default router;
