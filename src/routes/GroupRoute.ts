import { Router } from 'express';
import { createGroupValidation } from '../validators/Group/CreateValidation';
import GroupController from '../Controllers/Group/GroupController';
import { getGroupMembersValidation } from '../validators/Group/GetMember';
import { addMemberValidation } from '../validators/Group/AddMemberValidation';
import authenticateJwt from '../middlewares/AuthenticateJwt.Middlewares';
import { removeMemberValidation } from '../validators/Group/RemoveValidation';

const router = Router();

router.post('/create', createGroupValidation, GroupController.create);
router.get('/get',getGroupMembersValidation , GroupController.get);
router.put('/add-members',addMemberValidation ,authenticateJwt, GroupController.add);
router.delete('/remove-members',removeMemberValidation,authenticateJwt, GroupController.remove);


export default router;
