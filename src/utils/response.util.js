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
      if (this.data === '') {
        return res.status(this.statusCode).json({
          status: this.statusCode,
          message: this.message,
        });
      }

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

  /**
   * * Handle success response
   * @param  {integer} statusCode status code
   * @param  {string} message success message
   * @param  {object} data if no data, pass empty string
   * @param  {object} res response
   */
  static handleSuccessResponse(statusCode, message, data, res) {
    this.setSuccess(statusCode, message, data);
    return this.send(res);
  }

  /**
   * * Handle error response
   * @param  {integer} statusCode status code
   * @param  {string} message error message
   * @param  {object} res response
   */
  static handleErrorResponse(statusCode, message, res) {
    this.setError(statusCode, message, res);
    return this.send(res);
  }
}
export default ResponseUtil;
