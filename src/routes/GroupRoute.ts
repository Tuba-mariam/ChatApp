import { Router } from 'express';
import { createGroupValidation } from '../validators/Group/CreateValidation';
import GroupController from '../Controllers/Group/GroupController';
import { getGroupMembersValidation } from '../validators/Group/GetMember';
import { addMemberValidation } from '../validators/Group/AddMemberValidation';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';
import { removeMemberValidation } from '../validators/Group/RemoveValidation';
import requestValidationMiddleware from '../middlewares/RequestValidation.Middleware';

const router = Router();

router.post('/create', createGroupValidation,requestValidationMiddleware, GroupController.create);
router.get('/get',getGroupMembersValidation ,requestValidationMiddleware, GroupController.get);
router.put('/add-members',addMemberValidation, requestValidationMiddleware,authenticateJwt, GroupController.add);
router.delete('/remove-members',removeMemberValidation ,requestValidationMiddleware,authenticateJwt, GroupController.remove);


export default router;
