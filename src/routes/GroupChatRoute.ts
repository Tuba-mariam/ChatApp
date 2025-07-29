import { Router } from 'express';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';
import GroupChatController from '../Controllers/GroupChatController';
import sendGroupChatValidation from '../validators/GroupChatValidation/GroupChatValidation';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';

const router = Router();

router.post(
  '/send-group-chat/:groupId',
  authenticateJwt,
  sendGroupChatValidation,
  requestValidationMiddleware,
  GroupChatController.sendGroupChat
);
router.get('/get-group-chat/:groupId', GroupChatController.getGroupChat);

export default router;
