import UserSchema from '../../../database/model/user.model';

/**
 * This class will contains all helpers function to handle account with DB
 * required to save account for now
 */
class AccountHelpers {
  /**
   * Find a user in users table in database if exist  by given attribute and attribute value eg: email : youremail@gmail.com.
   * @param {string} attribute users table field.
   * @param {string} value value to be found.
   * @returns {object} founded user's data.
   */
  static async userExist(attribute, value) {
    const user = await UserSchema.findOne({ [attribute]: value });
    return user;
  }

  /**
   * Saves user account in the DB.
   * @param {object} user The request sent by a user.
   * @returns {object} account's data.
   */
  static async saveUser(user) {
    const savedUser = await UserSchema.create({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    return savedUser;
  }

  static async editUserProfile(id, data) {
    const editedUserProfile = await UserSchema.findByIdAndUpdate(id, {
      $set: {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
      },
    });
    return editedUserProfile;
  }
}

export default AccountHelpers;
