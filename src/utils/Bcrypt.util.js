import bcrypt from 'bcrypt';

/**
 * Bcrypt util class
 * Hash Password or compare password
 */
class BcryptUtil {
  /**
   * * Generated password
   * @param  {string} password string
   * @returns {string} string
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
  }

  /**
   * * Compare passwords
   * @param  {string} plainPassword string
   * @param  {string} hashPassword string
   * @returns {boolean} boolean
   */
  static comparePassword(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword);
  }
}

export default BcryptUtil;
