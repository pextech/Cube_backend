import { Router } from 'express';
import { checkUserRoleAndServiceExists } from './service.middleware';
import { validateServiceBody } from './service.validation';
import authorization from '../middleware/auth.middleware';
import ServiceController from './service.controller';

const router = Router();

router.post(
  '/',
  authorization,
  validateServiceBody,
  checkUserRoleAndServiceExists,
  ServiceController.createService,
);

export default router;
