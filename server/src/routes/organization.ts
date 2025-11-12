import { Router } from 'express';
import { OrganizationController } from '../controllers/index.js';

const router = Router();

router.get('/', OrganizationController.list);
router.post('/', OrganizationController.create);
router.get('/', OrganizationController.getById);
router.put('/', OrganizationController.update);
router.delete('/', OrganizationController.remove);

export default router;
