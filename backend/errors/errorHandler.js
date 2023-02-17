/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const {
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_ID_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,

} = require('../utils/errors');
const AuthError = require('./AuthError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');

const errorHandler = (error, req, res, next) => {
  // if (error instanceof mongoose.Error.CastError) {
  //   return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_ID_MESSAGE });
  // }
  // if (error instanceof mongoose.Error.ValidationError) {
  //   return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_DATA_MESSAGE });
  // }
  // if (error instanceof AuthError) {
  //   return res.status(error.statusCode).send({ message: error.message });
  // }
  // if (error instanceof NotFoundError) {
  //   return res.status(error.statusCode).send({ message: error.message });
  // }
  // if (error instanceof ForbiddenError) {
  //   return res.status(error.statusCode).send({ message: error.message });
  // }
  // return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
  const statusCode = error.statusCode || DEFAULT_ERROR;

  const message = statusCode === DEFAULT_ERROR ? DEFAULT_ERROR_MESSAGE : error.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
