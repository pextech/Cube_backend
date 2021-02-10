/**
 * Response util class
 */
class ResponseUtil {
  /**
   * * Function to run on success response
   * @param  {integer} statusCode
   * @param  {string} message
   * @param  {object} data
   * @returns {object}
   */
  static setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  /**
   * * Returns object of failed response
   * @param  {integer} statusCode
   * @param  {string} message
   * @returns {object}
   */
  static setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
   * * Function to send a response
   * @param  {object} res
   * @returns {object}
   */
  static send(res) {
    if (this.type === 'success') {
      return res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message,
        data: this.data,
      });
    }
    return res.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
    });
  }
}
export default ResponseUtil;
