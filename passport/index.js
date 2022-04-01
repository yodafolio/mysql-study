const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const crypto = require('crypto-js');
const { User } = require('../models');
const jwt = require("jsonwebtoken");

const { User } = require('../models');

require('dotenv').config();

const passportLoginVerify = async (email, userPassword, done) => {
    try {
        const user = await User.findOne({
            where: {
                userEmail: email
            }
        })
        if(!user) {
            done(null, false, { message: '존재하지 않는 사용자 입니다.'});
            return;
        };

        const compare = userPassword === user.userPassword;

        if(compare) {
            done(null, user);
            return;
        }

        done(null, false, { reason: '올바르지 않은 비밀번호 입니다.'});
    } catch (err) {
        console.log('err', err);
        done(e);
    }
}


