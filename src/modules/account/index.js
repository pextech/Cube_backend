import { Router } from 'express';
import account from './account.controller';
import {
  validateUser,
  validateSecurePassword,
} from './account.middleware';
import editValidUser from './helpers/validation';

const accountRouter = Router();

accountRouter.post('/register', validateUser, account.createAccount);
accountRouter.patch(
  '/securePassword',
  validateSecurePassword,
  account.updatingPassword,
);
accountRouter.patch('/:id', editValidUser, account.editAccount);

export default accountRouter;
