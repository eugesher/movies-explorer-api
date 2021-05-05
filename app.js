require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const router = require('./routes');
const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./errors/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMessages } = require('./utils');

const { PORT = 3000 } = process.env;
const app = express();

// noinspection JSIgnoredPromiseFromCall
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// noinspection JSCheckFunctionSignatures
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(router);

// noinspection JSCheckFunctionSignatures
app.use(errorLogger);
// noinspection JSCheckFunctionSignatures
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFound));
});
app.use(errorHandler);

app.listen(PORT);
