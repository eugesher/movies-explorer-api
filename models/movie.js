const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Поле 'страна' не может быть пустым"],
  },
  director: {
    type: String,
    required: [true, "Поле 'режиссёр' не может быть пустым"],
  },
  duration: {
    type: Number,
    required: [true, "Поле 'длительность' не может быть пустым"],
  },
  year: {
    type: String,
    required: [true, "Поле 'год выпуска' не может быть пустым"],
  },
  description: {
    type: String,
    required: [true, "Поле 'описание' не может быть пустым"],
  },
  image: {
    type: String,
    required: [true, "Поле 'ссылка на постер' не может быть пустым"],
    validate: [validator.isURL, "Поле 'ссылка на постер' содержит недопустимое значение"],
  },
  trailer: {
    type: String,
    required: [true, "Поле 'ссылка на трейлер' не может быть пустым"],
    validate: [validator.isURL, "Поле 'ссылка на трейлер' содержит недопустимое значение"],
  },
  thumbnail: {
    type: String,
    required: [true, "Поле 'ссылка на превью' не может быть пустым"],
    validate: [validator.isURL, "Поле 'ссылка на превью' содержит недопустимое значение"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
