import { Router } from 'express';
import { OrganizationController } from '../controllers/index.js';

const router = Router();

router.get('/', OrganizationController.list);
router.post('/', OrganizationController.create);

export default router;
