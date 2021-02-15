import { Router } from 'express';
import homeRouter from './home';
import mailRouter from './mail';
import userRouter from './auth/user.route';
import invoiceRouter from './invoice';
import serviceRouter from './services/service.route';
import authVerification from './middleware/auth.middleware';
import orderRouter from './order';

const indexRouter = Router();

indexRouter.use('/home', homeRouter);
indexRouter.use('/auth', userRouter);
indexRouter.use('/mail', mailRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/invoice', invoiceRouter);
indexRouter.use('/services', serviceRouter);
indexRouter.use('/edit-profile', userRouter);
indexRouter.use('/order', authVerification, orderRouter);

export default indexRouter;
