const concatenateErrors = (err) => Object.values(err.errors).map((e) => e.message).join('. ');

const errorMessages = {
  invalid: (fieldName) => `Поле '${fieldName}' содержит недопустимое значение`,
  empty: (fieldName) => `Поле '${fieldName}' не может быть пустым`,
  tooShort: (fieldName, length) => `Поле '${fieldName}' должно содержать не менее ${length} символов`,
  tooLong: (fieldName, length) => `Поле '${fieldName}' должно содержать не более ${length} символов`,
  wrongUserCredentials: 'Неправильные почта или пароль',
  unauthorized: 'Необходима авторизация',
  movieNotFound: 'Фильм не найден',
  deleteOnlyOwnMovie: 'Можно удалять только свои фильмы',
  invalidMovieId: 'Недопустимый идентификатор фильма',
  userNotFound: 'Пользователь не найден',
  invalidUserId: 'Недопустимый идентификатор пользователя',
  missingRequiredFields: 'Не заполнены обязательные поля',
  emailAlreadyExists: 'Пользователь с таким email уже существует',
  notFound: 'Запрашиваемый ресурс не найден',
  tooManyRequests: 'Слишком много запросов, попробуйте позже',
};

const fieldNames = {
  email: 'email',
  password: 'пароль',
  name: 'имя',
  country: 'страна создания',
  director: 'режиссёр',
  duration: 'длительность',
  year: 'год выпуска',
  description: 'описание',
  image: 'ссылка на постер',
  trailerLink: 'ссылка на трейлер',
  thumbnail: 'ссылка на превью',
  movieId: 'идентификатор фильма',
  nameRU: 'название (ru)',
  nameEN: 'название (en)',
};

const requestValidationErrorMessages = {
  token: {
    'any.required': errorMessages.unauthorized,
    'string.empty': errorMessages.unauthorized,
    'string.base': errorMessages.unauthorized,
  },
  email: {
    'any.required': errorMessages.empty(fieldNames.email),
    'string.empty': errorMessages.empty(fieldNames.email),
    'string.email': errorMessages.invalid(fieldNames.email),
    'string.base': errorMessages.invalid(fieldNames.email),
  },
  password: {
    'string.empty': errorMessages.empty(fieldNames.password),
    'string.base': errorMessages.invalid(fieldNames.password),
  },
  userName: {
    'any.required': errorMessages.empty(fieldNames.name),
    'string.empty': errorMessages.empty(fieldNames.name),
    'string.min': errorMessages.tooShort(fieldNames.name, '{#limit}'),
    'string.max': errorMessages.tooLong(fieldNames.name, '{#limit}'),
    'string.base': errorMessages.invalid(fieldNames.name),
  },
  country: {
    'any.required': errorMessages.empty(fieldNames.country),
    'string.empty': errorMessages.empty(fieldNames.country),
    'string.base': errorMessages.invalid(fieldNames.country),
  },
  director: {
    'any.required': errorMessages.empty(fieldNames.director),
    'string.empty': errorMessages.empty(fieldNames.director),
    'string.base': errorMessages.invalid(fieldNames.director),
  },
  duration: {
    'any.required': errorMessages.empty(fieldNames.duration),
    'number.base': errorMessages.invalid(fieldNames.duration),
  },
  year: {
    'any.required': errorMessages.empty(fieldNames.year),
    'string.empty': errorMessages.empty(fieldNames.year),
    'string.base': errorMessages.invalid(fieldNames.year),
  },
  description: {
    'any.required': errorMessages.empty(fieldNames.description),
    'string.empty': errorMessages.empty(fieldNames.description),
    'string.base': errorMessages.invalid(fieldNames.description),
  },
  image: {
    'any.required': errorMessages.empty(fieldNames.image),
    'string.empty': errorMessages.empty(fieldNames.image),
    'string.uri': errorMessages.invalid(fieldNames.image),
    'string.base': errorMessages.invalid(fieldNames.image),
  },
  trailerLink: {
    'any.required': errorMessages.empty(fieldNames.trailerLink),
    'string.empty': errorMessages.empty(fieldNames.trailerLink),
    'string.uri': errorMessages.invalid(fieldNames.trailerLink),
    'string.base': errorMessages.invalid(fieldNames.trailerLink),
  },
  thumbnail: {
    'any.required': errorMessages.empty(fieldNames.thumbnail),
    'string.empty': errorMessages.empty(fieldNames.thumbnail),
    'string.uri': errorMessages.invalid(fieldNames.thumbnail),
    'string.base': errorMessages.invalid(fieldNames.thumbnail),
  },
  beatFilmMovieId: {
    'any.required': errorMessages.empty(fieldNames.movieId),
    'number.base': errorMessages.invalid(fieldNames.movieId),
  },
  movieNameRU: {
    'any.required': errorMessages.empty(fieldNames.nameRU),
    'string.empty': errorMessages.empty(fieldNames.nameRU),
    'string.base': errorMessages.invalid(fieldNames.nameRU),
  },
  movieNameEN: {
    'any.required': errorMessages.empty(fieldNames.nameEN),
    'string.empty': errorMessages.empty(fieldNames.nameEN),
    'string.base': errorMessages.invalid(fieldNames.nameEN),
  },
  movieId: {
    'any.required': errorMessages.invalidMovieId,
    'string.empty': errorMessages.invalidMovieId,
    'string.hex': errorMessages.invalidMovieId,
    'string.length': errorMessages.invalidMovieId,
    'string.base': errorMessages.invalidMovieId,
  },
};

module.exports = {
  concatenateErrors, errorMessages, fieldNames, requestValidationErrorMessages,
};
