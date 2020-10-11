const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRATION_DURATION } = require('../config/constants');

/**
 * Function to generate token from userId and role
 * @param {object} data
 * @param {object} options
 * @returns {string} generated token
 */
const generateToken = async (data, options = { expiresIn: EXPIRATION_DURATION }) => {
  const token = await jwt.sign({ key: data }, SECRET_KEY, options);
  return token;
};

/**
 * Verify a token
 * @param {object} token
 * @returns {Object} decoded data
 */

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

/**
   * Verify a token
   * @param {object} token
   * @returns {Object} decoded data
   */

const formatJWTErrorMessage = (message) => {
  let formattedMessage;
  if (message.includes('invalid') || message.includes('malformed')) {
    formattedMessage = 'Session is invalid. Signin to continue';
  }
  if (message.includes('expired')) {
    formattedMessage = 'Session has expired. Signin to continue';
  }
  return formattedMessage;
};


module.exports = {
  verifyToken,
  generateToken,
  formatJWTErrorMessage
}