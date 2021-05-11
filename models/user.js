const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { errorMessages, fieldNames } = require('../utils');

const nameLength = { min: 2, max: 30 };

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, errorMessages.invalid(fieldNames.email)],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [nameLength.min, errorMessages.tooShort(fieldNames.name, nameLength.min)],
    maxlength: [nameLength.max, errorMessages.tooLong(fieldNames.name, nameLength.max)],
    required: true,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorMessages.wrongUserCredentials));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(errorMessages.wrongUserCredentials));
        }
        return user;
      });
    });
}

userSchema.statics = { findUserByCredentials };

module.exports = mongoose.model('user', userSchema);
