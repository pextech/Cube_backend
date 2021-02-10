import bcrypt from 'bcrypt';

/**
 * Bcrypt util class
 * Hash Password or compare password
 */
class BcryptUtil {
  /**
   * * @param  {string} password
   * * @returns {string} generate a password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
  }

  /**
   * * @param  {string} plainPassword
   * * @param  {string} hashPassword
   * * @returns {boolean} compare passwords
   */
  static comparePassword(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword);
  }
}

export default BcryptUtil;
