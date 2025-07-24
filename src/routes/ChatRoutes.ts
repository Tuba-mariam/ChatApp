import { Router } from 'express';
import ChatController from '../Controllers/ChatFunctionality/ChatController';
import sendMessageValidation from '../validators/ChatFunctionality/SendValidation';
import getMessageValidation from '../validators/ChatFunctionality/GetValidation';

import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';
import markMessageValidation from '../validators/ChatFunctionality/MarkValidation';

const router = Router();

router.post('/send-message', sendMessageValidation, requestValidationMiddleware, ChatController.Send);
router.get('/get-message/:receiver', getMessageValidation, requestValidationMiddleware, ChatController.getMess);
router.put('/mark-as-read', markMessageValidation, requestValidationMiddleware, ChatController.markAsRead);
export default router;
