const passport = require('passport');
const { User } = require('../models');
const crypto = require('crypto-js');
const jwt = require('../modules/jwt');


module.exports.createUser = async (req, res, next) => { // POST /user/
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
};

module.exports.loginUser = async (req, res, next) => {
    console.log('login ====');
    try {
        console.log('body', req.body)
        passport.authenticate('local', (passportError, user, info) => {
            // done(null, false, {reason:...}) 으로 넘어온 콜백 함수가 이곳에서의 (passportError, user, info) => {...}
            if(passportError) { // 그렇다는건 err은 서버에러를 의미 한다.
                console.log('SERVER ERR =>', passportError);
                return next(passportError);
            }
            if(info) { //info 가 있다는건 클라이언트 에러
                console.log('클라이언트 에러', info);
                return res.status(401).send(info.message); //상태코드 401은 "허가되지 않음" 을 의미
                // return res.status(401).send(info.reason); //상태코드 401은 "허가되지 않음" 을 의미
            }
            return req.login(user, { session: false }, async (loginErr) => { //login은 passport에 있는 함수
                try {
                    // console.log('login ==== 4', loginErr);
                    // 우리 서비스의 로직을 다 통과 하면 패스포트의 로그인을 로직을 타게 되는데
                    if(loginErr) { //그 과정에서 혹시나 로그인 에러가 난다면 해주는 에러 처리
                        console.error(loginErr);
                        return next(loginErr);
                    }
                    const userFilter = user.dataValues;
                    console.log('LOGINuser =>', user.dataValues);
                    const token = await jwt.sign(user.dataValues);
                    console.log('token=> ', token);
        
                    return res.status(200).json(token);
                    // passport 로그인을 할때 passport 로그인을 저장을 해줘야 하는데 이때 session이라는게 쓰인다.
                } catch (error) {
                    
                }
            });
        })(req, res, next);
    } catch (error) {
        
    }
};