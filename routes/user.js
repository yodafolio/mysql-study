const express = require('express');
const router = express.Router();
const { User } = require('../models');
const crypto = require('crypto-js');

router.post("/", async(req, res, next) => {// POST /user/
    try {
        console.log('req===', req.body);
        const { userEmail, userPassWord, userAge, userAddress, userGender } = req.body;
        const exUser = await User.findOne({
            where: {
                userEmail: req.body.userEmail,
            }
        })
        if(exUser) {
            return res.status(403).send('이미 존재하는 이메일 아이디 입니다.');
        }
        const hashedPassword = crypto.SHA256(userPassWord, process.env.SALT).toString();
        await User.create({userEmail, userPassWord: hashedPassword, userAge, userAddress, userGender})
        res.status(201).send('ok');
    } catch (err) {
        console.error(err);
        next(err); //status 500
    }
});

module.exports = router;