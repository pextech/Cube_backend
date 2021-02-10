import { Router } from 'express';
import order from './order.controller';
import orderSchema from './OrderSchema';
import validate from '../middleware/validation.middleware';

const orderRouter = Router();

orderRouter.post('/', validate(orderSchema), order.orderPackage);

export default orderRouter;
