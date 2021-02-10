import { Router } from 'express';
import invoice from './invoice.controller';
import validateInvoice from './invoice.middleware';

const invoiceRouter = Router();

invoiceRouter.post('/', validateInvoice, invoice.generateInvoice);

export default invoiceRouter;
