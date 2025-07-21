import { Router } from 'express';
import NotificationController from '../Controllers/Notification/NotificationController';
import sendNotificationValidation from '../validators/Notification/SendNotification';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';

const router = Router();

router.post('/send-notification', sendNotificationValidation, authenticateJwt, NotificationController.Send);
router.get('/get-notification', sendNotificationValidation, authenticateJwt, NotificationController.get);

export default router;
