const rateLimit = require('express-rate-limit');

const { errorMessages } = require('../utils');

module.exports.limiter = rateLimit({
  windowMs: 120 * 1000,
  max: 100,
  message: { message: errorMessages.tooManyRequests },
});
