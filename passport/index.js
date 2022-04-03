// const passport = require('passport');
// const local = require('./local');

// module.exports = () => {
//     passport.serializeUser((user, done) => {
//         console.log('serializeUser ====>>', user)
//     });

//     // passport.deserializeUser(() => {

//     // });

//     console.log('testetestes')
//     local();
// }





const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const crypto = require('crypto-js');
const { User } = require('../models');
const jwt = require("jsonwebtoken");

// const { User } = require('../models');

require('dotenv').config();


const passportConfig = { usernameField: 'userEmail', passwordField: 'userPassWord' }


const passportLoginVerify = async (userEmail, userPassWord, done) => {
    try {
        const user = await User.findOne({
            where: {
                userEmail
            }
        })
        if(!user) {
            done(null, false, { message: '존재하지 않는 사용자 입니다.'});
            return;
        };

        const hashedPassword = crypto.SHA256(userPassWord, process.env.SALT).toString();
    
        const passwordCheck = user.userPassWord === hashedPassword; // 비밀번호 확인

        // const compare = userPassWord === user.userPassword;

        if(passwordCheck) {
            console.log('passwordCheck===', user);
            return done(null, user);
        }

        done(null, false, { reason: '올바르지 않은 비밀번호 입니다.'});
    } catch (err) {
        console.log('err', err);
        done(e);
    }
}


module.exports = () => {
    passport.use('local', new LocalStrategy(passportConfig, passportLoginVerify));
  };