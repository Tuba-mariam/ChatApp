import { Router } from 'express';
import { createGroupValidation } from '../validators/Group/CreateValidation';
import GroupController from '../Controllers/Group/GroupController';
import { addMemberValidation } from '../validators/Group/AddMemberValidation';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';
import { removeMemberValidation } from '../validators/Group/RemoveValidation';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';

const router = Router();

router.post(
  '/create',
  authenticateJwt,
  createGroupValidation,
  requestValidationMiddleware,
  GroupController.createGroup
);
router.get('/members/:groupId', GroupController.getGroupMembers);
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
