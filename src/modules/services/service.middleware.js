import { CONFLICT, UNAUTHORIZED } from 'http-status';
import ServiceMaintain from '../../database/maintains/service.maintain';
import User from '../../database/model/user.model';
import ResponseUtil from '../../utils/response.util';

// eslint-disable-next-line import/prefer-default-export
export const checkUserRoleAndServiceExists = async (
  req,
  res,
  next,
) => {
  const user = await User.findOne({
    _id: req.userData._id,
  });

  const service = await ServiceMaintain.findServiceByProperty({
    name: req.body.name,
  });

  if (user && user.role !== 'Manager') {
    ResponseUtil.setError(
      UNAUTHORIZED,
      'Only a manager can create a service',
    );
    return ResponseUtil.send(res);
  }

  if (service) {
    ResponseUtil.setError(
      CONFLICT,
      `${req.body.name} service has been created`,
    );
    return ResponseUtil.send(res);
  }
  next();
};
