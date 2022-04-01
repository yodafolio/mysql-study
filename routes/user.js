const express = require('express');
const router = express.Router();
const { User } = require('../models');
const crypto = require('crypto-js');
const jwt = require('../modules/jwt');


router.post("/", async (req, res, next) => { // POST /user/
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

router.post("/login", async (req, res, next) => { // POST /user/login/
    try {
        const { userEmail, userPassWord } = req.body;
        const userRow = await User.findOne({
            where: {
                userEmail: userEmail,
            }
        })
        if(!userRow) return res.status(400).send('사용자가 존재하지 않습니다.'); // 존재 하지 않는 사용자 필터링

        // userRow 가 존재 한다면 아래 코드 진행
        const hashedPassword = crypto.SHA256(userPassWord, process.env.SALT).toString();

        const passwordCheck = userRow.userPassWord === hashedPassword;

        if(!passwordCheck) return res.status(400).send('비밀번호가 일치하지 않습니다.');

        // 토큰 발급
        // let accessToken = generateAccessToken(userEmail);
        // let refreshToken = generateRefreshToken(hashedPassword);
        const token = await jwt.sign(userRow);
        console.log('token=> ', token);
        // 상태 & 토큰 전송
        res.status(200).send(token);

        // res.status(200).cookie("refreshToken", refreshToken,  {
        //     sameSite: "none",
        //     secure: true,
        //     httpOnly: true,
        // }).send({
        //     data: { accessToken, refreshToken },
        //     pwCheck: false,
        //     content: "Login Success!!"
        // });
        
        
    } catch (err) {
        console.error(err);
        next(err); //status 500
    }
});

module.exports = router;