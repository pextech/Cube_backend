import Service from '../model/service.model';

/*
 * Service maintain class
 * Maintain functions needed for service tasks
 */
class ServiceMaintain {
  /**
   * * Creates a service
   * @param  {object} data
   * @returns {object}
   */
  static createService(data) {
    return Service.create(data);
  }

  /**
   * * Find a service by a property
   * @param  {object} property
   * @returns {object}
   */
  static findServiceByProperty(property) {
    return Service.findOne(property);
  }
}

export default ServiceMaintain;
