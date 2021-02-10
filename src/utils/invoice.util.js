import invoiceSchema from '../database/model/invoice.model';

/**
 * Function to handle invoice
 * @param  {object} body details of invoice
 */
const invoiceUtil = async (body) => {
  const savedInvoice = await invoiceSchema.create({
    orderId: body.orderId,
    due_date: body.due_date,
    amount: body.amount,
    status: 'pending',
  });
  return savedInvoice;
};

export default invoiceUtil;
