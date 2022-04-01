const express = require('express');
const router = express.Router();

const { Post } = require('../models');

router.post('/', async(req, res, next) => {
    try {
        const { content } = req.body;
        
        if(!content.length) return res.status(400).send('content가 비어 있습니다.');

        await Post.create({ content });

        res.status(200).send('Ok');
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;