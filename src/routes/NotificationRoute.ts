import { Router } from 'express';
import authenticateJwt from '../Middlewares/AuthenticateJwt.Middlewares';
import requestValidationMiddleware from '../Middlewares/RequestValidation.Middleware';
import sendNotificationValidation from '../validators/NotificationValidation/SendNotificationValidation';
import NotificationController from '../Controllers/NotificationController';

const router = Router();

router.post(
  '/send-notification/:sender',
  authenticateJwt,
  sendNotificationValidation,
  requestValidationMiddleware,
  NotificationController.sendNotification
);
router.get('/get-notifications', authenticateJwt, NotificationController.getAll);
router.put('/mark-as-read-notifications', authenticateJwt, NotificationController.markAsRead);

export default router;
