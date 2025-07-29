import { Router } from 'express';
import NotificationController from '../Controllers/Notification/NotificationController';
import sendNotificationValidation from '../validators/Notification/SendNotification';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';

const router = Router();

router.post(
  '/send-notification',
  sendNotificationValidation,
  requestValidationMiddleware,
  authenticateJwt,
  NotificationController.send
);
router.get('/get-notification', authenticateJwt, NotificationController.get);

export default router;
