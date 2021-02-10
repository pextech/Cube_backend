import Joi from 'joi';
import handleErrorsUtil from '../../utils/handle-errors.util';

// eslint-disable-next-line import/prefer-default-export
export const validateServiceBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .valid('Hosting', 'Domain Name', 'Maintenance')
      .required()
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is not allowed to be empty',
        'any.only':
          'Service name must be one of [Hosting, Domain Name, Maintenance]',
      }),
    price: Joi.number().greater(0).required().messages({
      'any.required': 'Price is required',
      'Number.base': 'Price must be a number',
      'number.greater': 'Price must be greater than 0',
    }),
    billingCycle: Joi.string()
      .valid('Monthly', 'Yearly')
      .required()
      .messages({
        'any.required': 'Billing Cycle is required',
        'string.empty': 'Billing Cycle is not allowed to be empty',
        'any.only': 'Billing Cycle must be one of [Monthly, Yearly]',
      }),
    descriptions: Joi.string().required().messages({
      'any.required': 'Descriptions is required',
      'string.empty': 'Descriptions is not allowed to be empty',
    }),
  }).options({ abortEarly: false });

  return handleErrorsUtil(schema, req.body, res, next);
};
