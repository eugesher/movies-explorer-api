// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const {
  validateRequestHeaders,
  validateUpdateUserInfoRequest,
} = require('../middlewares/validations');
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

router.get('/me', validateRequestHeaders, getCurrentUser);
router.patch('/me', validateUpdateUserInfoRequest, updateUserInfo);

module.exports = router;
