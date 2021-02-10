import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import TokenUtil from '../../utils/jwt.util';
import ResponseUtil from '../../utils/response.util';

/**
 * @class this class enables login
 */

class login {
  /**
   * @description this function is invoked to login
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns an object containing a success message and token
   */

  static async emailSignIn(req, res) {
    try {
      const userData = { ...req.userInfo._doc };
      delete userData.password;
      ResponseUtil.setSuccess(
        OK,
        `${req.userInfo.fullname} has successfully logged in`,
        { user: userData, token: TokenUtil.generateToken(userData) },
      );
      return ResponseUtil.send(res);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }
}

export default login;
