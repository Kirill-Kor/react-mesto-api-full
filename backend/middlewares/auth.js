/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { AUTH_ERROR_CODE, AUTH_REQUIRED_MESSAGE } = require('../utils/errors');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET = 'env-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthError(AUTH_ERROR_CODE, AUTH_REQUIRED_MESSAGE));
  }

  const token = authorization.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError(AUTH_ERROR_CODE, AUTH_REQUIRED_MESSAGE));
  }
  req.user = payload;

  next();
};
