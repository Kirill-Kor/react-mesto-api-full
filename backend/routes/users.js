const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers,
  getMyInfo,
  getUserById,
  patchUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)[www.]?\S+/),
  }),
}), patchUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)[www.]?\S+/),

  }),
}), patchUserInfo);

module.exports = router;
