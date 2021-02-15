/**
 * All models should be maintained within this class
 */
class InstanceMaintain {
  /**
   * * Create data
   * @param  {object} model model
   * @param  {object} data data
   * @returns {object} object
   */
  static createData(model, data) {
    return model.create(data);
  }

  /**
   * * Find one data
   * @param  {object} model model
   * @param  {object} data data
   * @returns {object} object
   */
  static findOneData(model, data) {
    return model.findOne(data);
  }

  /**
   * * Find and update one data
   * @param  {object} model model
   * @param  {object} property property
   * @param  {object} data data
   * @returns {object} object
   */
  static findOneAndUpdateData(model, property, data) {
    return model.findOneAndUpdate(property, data);
  }
}

export default InstanceMaintain;
