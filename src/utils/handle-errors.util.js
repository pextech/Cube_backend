import { BAD_REQUEST } from 'http-status';
import ResponseUtil from './response.util';

/**
 * Function to handle errors
 * @param  {object} schema validation schema
 * @param  {object} body body of the validation
 * @param  {object} res response
 * @param  {object} next function
 */
const handleErrorsUtil = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    return ResponseUtil.handleErrorResponse(BAD_REQUEST, errors, res);
  }
  next();
};

export default handleErrorsUtil;
