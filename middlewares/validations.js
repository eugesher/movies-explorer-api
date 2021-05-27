const { celebrate, Joi } = require('celebrate');

const { requestValidationErrorMessages } = require('../utils');

module.exports.validateSignInRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(requestValidationErrorMessages.email),
    password: Joi.string().required()
      .messages(requestValidationErrorMessages.password),
  }),
});

module.exports.validateSignUpRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(requestValidationErrorMessages.email),
    password: Joi.string().required()
      .messages(requestValidationErrorMessages.password),
    name: Joi.string().required().min(2).max(30)
      .messages(requestValidationErrorMessages.userName),
  }),
});

module.exports.validateRequestHeaders = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required()
        .messages(requestValidationErrorMessages.token),
    })
    .unknown(true),
});

module.exports.validateUpdateUserInfoRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required()
        .messages(requestValidationErrorMessages.token),
    })
    .unknown(true),
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(requestValidationErrorMessages.email),
    name: Joi.string().required().min(2).max(30)
      .messages(requestValidationErrorMessages.userName),
  }),
});

module.exports.validateCreateMovieRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required()
        .messages(requestValidationErrorMessages.token),
    })
    .unknown(true),
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages(requestValidationErrorMessages.country),
    director: Joi.string().required()
      .messages(requestValidationErrorMessages.director),
    duration: Joi.number().required()
      .messages(requestValidationErrorMessages.duration),
    year: Joi.string().required()
      .messages(requestValidationErrorMessages.year),
    description: Joi.string().required()
      .messages(requestValidationErrorMessages.description),
    image: Joi.string().required().uri()
      .messages(requestValidationErrorMessages.image),
    trailer: Joi.string().required()
      .messages(requestValidationErrorMessages.trailer),
    thumbnail: Joi.string().required().uri()
      .messages(requestValidationErrorMessages.thumbnail),
    movieId: Joi.number().required()
      .messages(requestValidationErrorMessages.beatFilmMovieId),
    nameRU: Joi.string().required()
      .messages(requestValidationErrorMessages.movieNameRU),
    nameEN: Joi.string().required()
      .messages(requestValidationErrorMessages.movieNameEN),
  }),
});

module.exports.validateDeleteMovieRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required()
        .messages(requestValidationErrorMessages.token),
    })
    .unknown(true),
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24)
      .messages(requestValidationErrorMessages.movieId),
  }),
});
