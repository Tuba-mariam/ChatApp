
import { Router } from "express";
import ChatController from "../Controllers/ChatFunctionality/ChatController";
import sendMessageValidation from "../validators/ChatFunctionality/SendValidation";
import getMessageValidation from "../validators/ChatFunctionality/GetValidation";
import markMessageValidation from "../validators/ChatFunctionality/MarkValidation";

const router = Router();

router.post('/send-message', sendMessageValidation, ChatController.Send);
router.get('/get-message',getMessageValidation, ChatController.getMess);
router.put('/mark-as-message',markMessageValidation, ChatController.markAsRead)
export default router;
