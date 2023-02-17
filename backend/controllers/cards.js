const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

const {
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_CARD_MESSAGE,
  FORBIDDEN_ERROR_CODE,
  FORBIDDEN_ERROR_MESSAGE,
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
} = require('../utils/errors');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({})
      .populate('owner likes');

    res.send(cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    let card = await Card.create({ name, link, owner: req.user });
    card = await card.populate('owner likes');
    res.send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new Error(INCORRECT_DATA_ERROR_CODE, INCORRECT_DATA_MESSAGE));
    } else next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_CARD_MESSAGE);
    }
    // eslint-disable-next-line eqeqeq
    if (req.user._id != card.owner) {
      throw new ForbiddenError(FORBIDDEN_ERROR_CODE, FORBIDDEN_ERROR_MESSAGE);
    }

    const cardToDelete = await Card.findByIdAndRemove(req.params.cardId);
    res.send(cardToDelete);
  } catch (error) {
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    ).populate('owner likes');
    if (card === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_CARD_MESSAGE);
    } else res.send(card);
  } catch (error) {
    next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    ).populate('owner likes');
    if (card === null) {
      throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_CARD_MESSAGE);
    } else res.send(card);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
