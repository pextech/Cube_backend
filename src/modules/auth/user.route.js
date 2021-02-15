import { Router } from 'express';
import AuthController from './auth.controller';
import {
  validateUserBody,
  validateSecurePassword,
  validateLoginBody,
} from './auth.validation';
import editValidUser from '../account/helpers/validation';
import {
  checkEmailExists,
  checkPasswordCredentials,
  checkUserCredential,
} from './auth.middleware';

const userRouter = Router();

userRouter.post(
  '/register',
  validateUserBody,
  checkEmailExists,
  AuthController.createAccount,
);
userRouter.post(
  '/login',
  validateLoginBody,
  checkUserCredential,
  AuthController.login,
);
userRouter.patch(
  '/secure-password',
  validateSecurePassword,
  checkPasswordCredentials,
  AuthController.updatingPassword,
);
userRouter.patch('/:id', editValidUser, AuthController.editAccount);

userRouter.post('/seed', AuthController.seed);

export default userRouter;
