import jwt from 'jsonwebtoken';

/**
 * Token util class
 * Generate a token or compare the token
 */
class TokenUtil {
  /**
   * @param {string} data
   * @returns {string} function to generate a token string
   */
  static generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_TIME,
    });
  }

  /**
   * @param  {string} token
   * @returns {object} function to verify a token
   */
  static verifyToken(token) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return err;
        }
        return decoded;
      },
    );
  }
}

export default TokenUtil;
