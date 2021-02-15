import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from 'http-status';
import User from '../../database/model/user.model';
import InstanceMaintain from '../../database/maintains/instance.maintain';
import ResponseUtil from '../../utils/response.util';
import BcryptUtil from '../../utils/Bcrypt.util';

export const checkEmailExists = async (req, res, next) => {
  const user = await InstanceMaintain.findOneData(User, {
    email: req.body.email,
  });
  if (user) {
    ResponseUtil.setError(
      CONFLICT,
      'User with this email already exist',
    );
    return ResponseUtil.send(res);
  }
  next();
};

export const checkPasswordCredentials = async (req, res, next) => {
  const user = await InstanceMaintain.findOneData(User, {
    email: req.body.email,
  });
  if (!user) {
    ResponseUtil.setError(NOT_FOUND, 'User not found');
    return ResponseUtil.send(res);
  }

  if (user.password) {
    ResponseUtil.setError(
      CONFLICT,
      'Error, Account is already secured with a password',
    );
    return ResponseUtil.send(res);
  }
  next();
};

export const checkUserCredential = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await InstanceMaintain.findOneData(User, { email });
  if (!user || !BcryptUtil.comparePassword(password, user.password)) {
    ResponseUtil.setError(UNAUTHORIZED, 'Invalid email or password');
    return ResponseUtil.send(res);
  }
  req.userInfo = user;
  next();
};
