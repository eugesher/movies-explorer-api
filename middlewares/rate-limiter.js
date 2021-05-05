const rateLimit = require('express-rate-limit');

const { errorMessages } = require('../utils');

module.exports.limiter = rateLimit({
  windowMs: 1000,
  max: 1,
  message: { message: errorMessages.tooManyRequests },
});
