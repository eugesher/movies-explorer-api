const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Поле 'email' не может быть пустым"],
    unique: true,
    validate: [validator.isEmail, "Поле 'email' содержит недопустимое значение"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, "Поле 'имя' должно содержать не менее 2 символов"],
    maxlength: [30, "Поле 'имя' должно содержать не более 30 символов"],
    required: true,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    });
}

userSchema.statics = { findUserByCredentials };

module.exports = mongoose.model('user', userSchema);
