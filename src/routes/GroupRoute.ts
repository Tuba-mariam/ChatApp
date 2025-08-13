import { Router } from 'express';
import { createGroupValidation } from '../validators/Group/CreateValidation';
import { addMemberValidation } from '../validators/Group/AddMemberValidation';
import authenticateJwt from '../Middlewares/AuthenticateJwt.Middlewares';
import { removeMemberValidation } from '../validators/Group/RemoveValidation';
import requestValidationMiddleware from '../Middlewares/RequestValidation.Middleware';
import GroupController from '../Controllers/GroupController';

const router = Router();

router.post(
  '/create',
  authenticateJwt,
  createGroupValidation,
  requestValidationMiddleware,
  GroupController.createGroup
);
router.get('/members/:groupId', GroupController.getGroup);

router.put(
  '/add-member/:groupId',
  addMemberValidation,
  requestValidationMiddleware,
  authenticateJwt,
  GroupController.addMemberToGroup
);
router.delete(
  '/remove-member/:groupId',
  removeMemberValidation,
  requestValidationMiddleware,
  authenticateJwt,
  GroupController.removeMemberFromGroup
);

export default router;
