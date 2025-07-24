import { Router } from 'express';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';
import ChatGroupController from '../Controllers/ChatGroupController';
import sendGroupChatValidation from '../validators/ChatGroupValidation/ChatGroupValidation';

const router = Router();

router.post('/send-chat-group', sendGroupChatValidation, requestValidationMiddleware, ChatGroupController.SendChat);
router.get('/get-chat-group/:groupId', ChatGroupController.getChatGroup);

export default router;
