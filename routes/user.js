const express = require('express');
const router = express.Router();

const { createUser, loginUser, userInfo } = require('../controllers/userController');

router.post('/signup', createUser);
router.post ('/login', loginUser);
router.get('/profile', userInfo);


module.exports = router;