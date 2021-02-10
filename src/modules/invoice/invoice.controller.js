import { INTERNAL_SERVER_ERROR, CREATED } from 'http-status';
import ResponseUtil from '../../utils/response.util';
import invoiceHelper from './invoice.helper';

/**
 * This class will contains all function to handle account
 * required to create account for now
 */
class InvoiceController {
  /**
   * This function to handle generate invoice request.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some data of created account.
   */
  static async generateInvoice(req, res) {
    try {
      await invoiceHelper.generatePDF(req.body);
      const data = await invoiceHelper.saveInvoice(req.body);
      ResponseUtil.setSuccess(
        CREATED,
        'Invoice generated successfully, check your email',
        data,
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
    }
  }
}

export default InvoiceController;
