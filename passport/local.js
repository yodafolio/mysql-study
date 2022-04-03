const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const crypto = require('crypto-js');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userEmail', // 프론트에서 보내는 아이디가 req.body.userEmail 이면 'userEmail'로
        passwordField: 'userPassWord',
        session: false,
    }, async (userEmail, userPassWord, done) => { // 로그인 전략은 이곳에서
        console.log('userEmail= >', userEmail);
        try {
            const user = await User.findOne({ // 이메일 존재 여부 검사
                where: { userEmail }
            })
            if(!user) { // 존재 하지 않는다면
                return done(null, false, { reason: '존재하지 않는 사용자 입니다.' });
                // null => 서버 에러
                // false => 성공
                // { reason: .... }} => 클라이언트 에러
            }
    
            const hashedPassword = crypto.SHA256(userPassWord, process.env.SALT).toString();
    
            const passwordCheck = user.userPassWord === hashedPassword; // 비밀번호 확인
            
            if(passwordCheck) { // 비밀번호 일치하면 데이터 넘기기 (두번째 인자에 user정보 넘기기)
                console.log('passwordCheck===', user);
                return done(null, user);
            }
    
            return done(null, false, { reason: '비밀번호가 일치하지 않습니다.' });            
        } catch (err) {
            console.log('passport err ==>', err);
        }
    }));
}