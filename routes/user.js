const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => { //GET /user
    try {
        res.status(200).json({content: 'user route test'})
    } catch (error) {
        
    }
})

module.exports = router;