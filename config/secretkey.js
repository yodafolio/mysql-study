const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secretKey: process.env.LOGINSECRETKEY, // 원하는 시크릿 키
    option: {
        algorithm : process.env.LOGINSECRETALGORITHM, // 해싱 알고리즘
        expiresIn : process.env.LOGINSECRETEXPIRESIN,  // 토큰 유효 기간
        issuer : process.env.LOGINSECRETISSUER // 발행자
    }
}



