import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import handleErrorsUtil from '../../utils/handle-errors.util';

const customJoi = Joi.extend(joiPhone);

/**
 * This fuction handle create account validation.
 * @param {object} req The user's request.
 * @param {object} res The response.
 * @param {object} next call.
 * @returns {object} The message.
 */
const validateUser = (req, res, next) => {
  const accountSchema = Joi.object()
    .keys({
      fullname: Joi.string().trim().min(2).required().messages({
        'any.required': 'Full Name is required',
        'string.empty': 'Full Name is not allowed to be empty',
        'string.min':
          'Full Name length must be at least 2 characters long',
      }),
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is not allowed to be empty',
        'string.email': 'Email must be a valid email',
      }),
      phone: customJoi
        .string()
        .phoneNumber({ format: 'international', strict: true })
        .required()
        .messages({
          'any.required': 'Phone Number is required',
          'string.empty': 'Phone Number is not allowed to be empty',
          'phoneNumber.invalid':
            'Phone Number did not seem to be a phone number',
        }),
      role: Joi.string()
        .valid('visitor', 'client', 'manager', 'admin')
        .lowercase()
        .required()
        .messages({
          'any.required': 'Role is required',
          'any.only':
            'Role must be one of [visitor, client, manager, admin]',
          'string.empty': 'Role is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return handleErrorsUtil(accountSchema, req.body, res, next);
};

const validateSecurePassword = (req, res, next) => {
  const passwordSchema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .regex(
          /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/,
        )
        .messages({
          'any.required': 'Password is a required field',
          'string.pattern.base':
            'Password must be at least 8 characters long with a number, Upper and lower cases, and a special character',
        }),
    })
    .options({ abortEarly: false });
  return handleErrorsUtil(passwordSchema, req.body, res, next);
};

export { validateUser, validateSecurePassword };
