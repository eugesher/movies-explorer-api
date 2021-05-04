const router = require('express').Router();

const { getCurrentUser, updateUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserInfo);

module.exports = router;
