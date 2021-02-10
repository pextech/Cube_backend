import {
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
  OK,
  NOT_FOUND,
} from 'http-status';
import User from '../../database/model/user.model';
import ResponseUtil from '../../utils/response.util';
import accountHelper from './helpers/account.helper';
import BcryptUtil from '../../utils/Bcrypt.util';

/**
 * This class will contains all function to handle account
 * required to create account for now
 */
class UserAccount {
  /**
   * This function to handle create ccount request.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some data of created account.
   */
  static async createAccount(req, res) {
    try {
      const accountExist = await accountHelper.userExist(
        'email',
        req.body.email,
      );
      if (accountExist) {
        ResponseUtil.setError(CONFLICT, 'User with this email exist');
        return ResponseUtil.send(res);
      }

      const account = await accountHelper.saveUser(req.body);
      ResponseUtil.setSuccess(
        CREATED,
        'User account created successfully',
        account,
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
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
    try {
      const { password, email } = req.body;
      const user = await User.findOne({ email });
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
      const hashedPassword = BcryptUtil.hashPassword(password);
      const newUser = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true },
      );
      ResponseUtil.setSuccess(
        OK,
        'Successful updated your password',
        newUser,
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
    }
  }
}

export default UserAccount;
