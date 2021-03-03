import handleErrorsUtil from '../../utils/handle-errors.util';
import {
  accountSchema,
  loginSchema,
  passwordSchema,
} from '../../utils/schema/user.schema';

/**
 * *Handle create account validation.
 * @param {object} req request
 * @param {object} res response
 * @param {object} next function
 * @returns {object} Object
 */
export const validateUserBody = (req, res, next) => {
  return handleErrorsUtil(accountSchema, req.body, res, next);
};

/**
 * *Handle login validation.
 * @param {object} req request
 * @param {object} res response
 * @param {object} next function
 * @returns {object} Object
 */
export const validateLoginBody = (req, res, next) => {
  return handleErrorsUtil(loginSchema, req.body, res, next);
};

/**
 * * Handle secure password validation.
 * @param {object} req request
 * @param {object} res response
 * @param {object} next function
 * @returns {object} Object
 */
export const validateSecurePassword = (req, res, next) => {
  return handleErrorsUtil(passwordSchema, req.body, res, next);
};
