const DEFAULT_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';

const INCORRECT_DATA_ERROR_CODE = 400;
const INCORRECT_DATA_MESSAGE = 'Некорректные данные';
const INCORRECT_ID_MESSAGE = 'Некорректный ID для поиска';

const NOT_FOUND_STATUS_CODE = 404;
const NOT_FOUND_USER_MESSAGE = 'Пользователь c таким Email не найден';
const NOT_FOUND_CARD_MESSAGE = 'Карточка с таким ID не найдена';
const NOT_FOUND_PAGE = 'Страницы с таким адресом не существует';

const AUTH_ERROR_CODE = 401;
const AUTH_REQUIRED_MESSAGE = 'Необходима авторизация';
const AUTH_INCORRECT_DATA_MESSAGE = 'Неверный логин или пароль';
const AUTH_ALREADY_EXISTS_CODE = 409;
const AUTH_ALREADY_EXISTS_MESSAGE = 'Пользователь с таким Email уже существует';

const FORBIDDEN_ERROR_CODE = 403;
const FORBIDDEN_ERROR_MESSAGE = 'Отсутствуют права для выполнения действия';

module.exports = {
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_USER_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  INCORRECT_ID_MESSAGE,
  NOT_FOUND_PAGE,
  AUTH_ERROR_CODE,
  AUTH_REQUIRED_MESSAGE,
  AUTH_INCORRECT_DATA_MESSAGE,
  AUTH_ALREADY_EXISTS_CODE,
  AUTH_ALREADY_EXISTS_MESSAGE,
  FORBIDDEN_ERROR_CODE,
  FORBIDDEN_ERROR_MESSAGE,
};
