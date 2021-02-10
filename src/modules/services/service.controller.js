import { CREATED } from 'http-status';
import ServiceMaintain from '../../database/maintains/service.maintain';
import ResponseUtil from '../../utils/response.util';

/**
 * Service controller class
 */
class ServiceController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} function to create a service
   */
  static async createService(req, res) {
    const { name, price, billingCycle, descriptions } = req.body;
    const service = await ServiceMaintain.createService({
      userId: req.userData._id,
      name,
      price,
      billingCycle,
      descriptions,
    });
    ResponseUtil.setSuccess(
      CREATED,
      'Service has been created successfully',
      service,
    );
    return ResponseUtil.send(res);
  }
}

export default ServiceController;
