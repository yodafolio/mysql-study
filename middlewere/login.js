exports.isLoggedIn = (req, res, next) => {
    req.headers.authorization
        ? next()
        : res.status(401).send('로그인이 필요합니다.');
    
    // console.log('req.headers=======>>>', req.headers.authorization);
    // req.isAuthenticated()
    //     ? next()
    //     : res.status(401).send('로그인이 필요합니다.');
}

exports.isNotLoggedIn = (req, res, next) => {
    !req.headers.authorization
        ? next()
        : res.status(401).send('로그인 하지 않은 사용자만 접근 가능 합니다.');
    // !req.isAuthenticated()
    //     ? next()
    //     : res.status(401).send('로그인 하지 않은 사용자만 접근 가능 합니다.');
}