const express = require('express');
const router = express.Router();

// const { Post, User } = require('../models');
const { isLoggedIn } = require('../middlewere/login');
// const { verify } = require('../modules/jwt');
const { createPost, loadPostList } = require('../controllers/postController');


router.post('/', isLoggedIn, createPost);
router.get('/', isLoggedIn, loadPostList);


module.exports = router;