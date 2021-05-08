const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const { concatenateErrors, errorMessages } = require('../utils');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      } else {
        res.send({ email: user.email, name: user.name });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(errorMessages.invalidUserId));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      } else {
        res.send({ email: user.email, name: user.name });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(errorMessages.invalidUserId));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(concatenateErrors(err)));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessages.emailAlreadyExists));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return new Promise(() => {
    if (!email || !password || !name) {
      throw new BadRequestError(errorMessages.missingRequiredFields);
    }
    bcrypt
      .hash(password, 8)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then((user) => {
        const u = user.toObject();
        delete u.password;
        res.send(u);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(errorMessages.emailAlreadyExists));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError(concatenateErrors(err)));
        } else {
          next(err);
        }
      });
  }).catch(next);
};
