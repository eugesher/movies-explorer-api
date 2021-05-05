module.exports.concatenateErrors = (err) => Object.values(err.errors).map((e) => e.message).join('. ');

module.exports.errorMessages = {
  invalid: (fieldName) => `Поле ${fieldName} содержит недопустимое значение`,
  empty: (fieldName) => `Поле ${fieldName} не может быть пустым`,
  tooShort: (fieldName, length) => `Поле ${fieldName} должно содержать не менее ${length} символов`,
  tooLong: (fieldName, length) => `Поле ${fieldName} должно содержать не более ${length} символов`,
  wrongUserCredentials: 'Неправильные почта или пароль',
};

module.exports.fieldNames = {
  email: 'email',
  name: 'имя',
};
