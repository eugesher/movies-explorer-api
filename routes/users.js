// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const { validateRequestHeaders } = require('../middlewares/validations');
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

router.get('/me', validateRequestHeaders, getCurrentUser);
router.patch('/me', updateUserInfo);

module.exports = router;
