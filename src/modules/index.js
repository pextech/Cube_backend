import { Router } from 'express';
import homeRouter from './home';
import mailRouter from './mail';
import loginRouter from './user';
import accountRouter from './account';
import invoiceRouter from './invoice';
import serviceRouter from './services/service.route';
import {
  checkUserCredential,
  validateLoginBody,
} from './user/login.helper';
import authVerification from './middleware/auth.middleware';
import orderRouter from './order';

const indexRouter = Router();

indexRouter.use('/home', homeRouter);
indexRouter.use('/mail', mailRouter);
indexRouter.use(
  '/user/login',
  validateLoginBody,
  checkUserCredential,
  loginRouter,
);
indexRouter.use('/user', accountRouter);
indexRouter.use('/seed', loginRouter);
indexRouter.use('/invoice', invoiceRouter);
indexRouter.use('/register', accountRouter);
indexRouter.use('/services', serviceRouter);
indexRouter.use('/edit-profile', accountRouter);
indexRouter.use('/order', authVerification, orderRouter);

export default indexRouter;
