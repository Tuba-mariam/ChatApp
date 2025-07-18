
import { Router } from "express";
import sendMessageValidation from "../validators/ChatFunctionality/sendValidation";
import ChatController from "../Controllers/ChatFunctionality/ChatController";

const router = Router();

router.post('/send-otp', sendMessageValidation, ChatController.Send);


export default router;
