import { UNAUTHORIZED } from 'http-status';
import Joi from 'joi';
import User from '../../database/model/user.model';
import BcryptUtil from '../../utils/Bcrypt.util';
import handleErrorsUtil from '../../utils/handle-errors.util';
import ResponseUtil from '../../utils/response.util';

export const validateLoginBody = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is not allowed to be empty',
      'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
    }),
  }).options({ abortEarly: false });

  return handleErrorsUtil(schema, req.body, res, next);
};

export const checkUserCredential = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !BcryptUtil.comparePassword(password, user.password)) {
    ResponseUtil.setError(UNAUTHORIZED, 'Invalid email or password');
    return ResponseUtil.send(res);
  }
  req.userInfo = user;
  next();
};
