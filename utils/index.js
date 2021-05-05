module.exports.concatenateErrors = (err) => Object.values(err.errors).map((e) => e.message).join('. ');

module.exports.errorMessages = {
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
};

module.exports.fieldNames = {
  email: 'email',
  name: 'имя',
  country: 'страна создания',
  director: 'режиссёр',
  duration: 'длительность',
  year: 'год выпуска',
  description: 'описание',
  image: 'ссылка на постер',
  trailer: 'ссылка на трейлер',
  thumbnail: 'ссылка на превью',
  movieId: 'идентификатор фильма',
  nameRU: 'имя(ru)',
  nameEN: 'имя(en)',
};
