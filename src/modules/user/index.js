import { Router } from 'express';
import login from './login.controller';

const { emailSignIn } = login;

const loginRouter = Router();

loginRouter.post('/', emailSignIn);

export default loginRouter;
