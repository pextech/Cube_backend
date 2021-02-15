import {
  INTERNAL_SERVER_ERROR,
  CREATED,
  OK,
  NOT_FOUND,
} from 'http-status';
import ResponseUtil from '../../utils/response.util';
import User from '../../database/model/user.model';
import accountHelper from '../account/helpers/account.helper';
import BcryptUtil from '../../utils/Bcrypt.util';
import InstanceMaintain from '../../database/maintains/instance.maintain';
import data from '../../database/seed/data';
import TokenUtil from '../../utils/jwt.util';

/**
 * This class will contains all function to handle account
 * required to create account for now
 */
class AuthController {
  /**
   * This function to handle create ccount request.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some data of created account.
   */
  static async createAccount(req, res) {
    try {
      const user = await InstanceMaintain.createData(User, req.body);
      return ResponseUtil.handleSuccessResponse(
        CREATED,
        'User account created successfully',
        user,
        res,
      );
    } catch (error) {
      return ResponseUtil.handleErrorResponse(
        INTERNAL_SERVER_ERROR,
        error.toString(),
        res,
      );
    }
  }

  /**
   * @description this function is invoked to login
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns an object containing a success message and token
   */

  static async login(req, res) {
    const { email } = req.body;
    try {
      await InstanceMaintain.findOneAndUpdateData(
        User,
        { email },
        { role: 'client' },
      );

      const user = await InstanceMaintain.findOneData(User, {
        email,
      });

      const userData = { ...user._doc };
      delete userData.password;
      return ResponseUtil.handleSuccessResponse(
        OK,
        'Successfully logged in',
        {
          user: userData,
          token: TokenUtil.generateToken(userData),
        },
        res,
      );
    } catch (error) {
      return ResponseUtil.handleErrorResponse(
        INTERNAL_SERVER_ERROR,
        error.toString(),
        res,
      );
    }
  }

  static async editAccount(req, res) {
    try {
      const { id } = req.params;
      const userToEdit = await User.findById(id);
      if (userToEdit) {
        const editedProfile = await accountHelper.editUserProfile(
          id,
          req.body,
        );
        return res.status(OK).json({
          status: OK,
          message: 'User account updated successfully',
          data: editedProfile,
        });
      }
      return res
        .status(NOT_FOUND)
        .json({ status: NOT_FOUND, message: 'User not found' });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: 'Failed to update profile',
      });
    }
  }

  /**
   * This function is for updating the user password.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some data of created account.
   */
  static async updatingPassword(req, res) {
    const { email, password } = req.body;
    try {
      await InstanceMaintain.findOneAndUpdateData(
        User,
        { email },
        {
          password: BcryptUtil.hashPassword(password),
        },
      );

      const user = await InstanceMaintain.findOneData(User, {
        email,
      });

      const updatedData = { ...user._doc };
      delete updatedData.password;

      ResponseUtil.setSuccess(
        OK,
        'Successful updated your password',
        updatedData,
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
    }
  }

  static async seed(req, res) {
    await User.deleteMany({});
    const userSeed = await InstanceMaintain.createData(
      User,
      data.users,
    );
    ResponseUtil.setSuccess(201, 'Users seeded', userSeed);
    return ResponseUtil.send(res);
  }
}

export default AuthController;
