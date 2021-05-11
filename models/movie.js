const mongoose = require('mongoose');
const validator = require('validator');

const { errorMessages, fieldNames } = require('../utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.country)],
  },
  director: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.director)],
  },
  duration: {
    type: Number,
    required: [true, errorMessages.empty(fieldNames.duration)],
  },
  year: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.year)],
  },
  description: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.description)],
  },
  image: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.image)],
    validate: [validator.isURL, errorMessages.invalid(fieldNames.image)],
  },
  trailer: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.trailer)],
    validate: [validator.isURL, errorMessages.invalid(fieldNames.trailer)],
  },
  thumbnail: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.thumbnail)],
    validate: [validator.isURL, errorMessages.invalid(fieldNames.thumbnail)],
  },
  movieId: {
    type: Number,
    required: [true, errorMessages.empty(fieldNames.movieId)],
  },
  nameRU: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.nameRU)],
  },
  nameEN: {
    type: String,
    required: [true, errorMessages.empty(fieldNames.nameEN)],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
