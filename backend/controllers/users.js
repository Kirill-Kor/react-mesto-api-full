const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');

const { JWT_SECRET = 'env-key' } = process.env;

const {
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_USER_MESSAGE,
  AUTH_ERROR_CODE,
  AUTH_INCORRECT_DATA_MESSAGE,
  AUTH_ALREADY_EXISTS_CODE,
  AUTH_ALREADY_EXISTS_MESSAGE,
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
} = require('../utils/errors');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getMyInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_USER_MESSAGE);
    } else res.send(user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_USER_MESSAGE);
    } else res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            next(new AuthError(AUTH_ALREADY_EXISTS_CODE, AUTH_ALREADY_EXISTS_MESSAGE));
          } else if (error.name === 'ValidationError') {
            next(new Error(INCORRECT_DATA_ERROR_CODE, INCORRECT_DATA_MESSAGE));
          } else next(error);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new AuthError(AUTH_ERROR_CODE, AUTH_INCORRECT_DATA_MESSAGE);
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) throw new AuthError(AUTH_ERROR_CODE, AUTH_INCORRECT_DATA_MESSAGE);
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
            res.send({ token });
          })
          .catch(next);
      }
    })
    .catch(next);
};

const patchUserInfo = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_USER_MESSAGE);
    } else res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new Error(INCORRECT_DATA_ERROR_CODE, INCORRECT_DATA_MESSAGE));
    } else next(error);
  }
};

const patchUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (user === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_USER_MESSAGE);
    } else res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new Error(INCORRECT_DATA_ERROR_CODE, INCORRECT_DATA_MESSAGE));
    } else next(error);
  }
};

module.exports = {
  getUsers,
  getMyInfo,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
  login,
};
