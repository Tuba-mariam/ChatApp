import { Router } from 'express';
import authenticateJwt from '../Middlewares/AuthenticateJwt.Middlewares';
import requestValidationMiddleware from '../Middlewares/RequestValidation.Middleware';
import ConversationController from '../Controllers/ConversationController';
import { createConversationValidation } from '../validators/CreateConversation';

const router = Router();

router.post(
  '/create',
  authenticateJwt,
  createConversationValidation,
  requestValidationMiddleware,
  ConversationController.createConversation
);
router.get('/get-conversation', authenticateJwt, ConversationController.getConversations);

export default router;
