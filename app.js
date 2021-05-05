require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { limiter } = require('./middlewares/rate-limiter');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const router = require('./routes');
const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./errors/error-handler');
const { validateSignInRequest, validateSignUpRequest } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMessages } = require('./utils');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateSignInRequest, login);
app.post('/signup', validateSignUpRequest, createUser);
app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFound));
});
app.use(errorHandler);

app.listen(PORT);
