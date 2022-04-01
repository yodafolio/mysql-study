exports.isLoggedIn = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(401).send('로그인이 필요합니다.');
}

exports.isNotLoggedIn = (req, res, next) => {
    !req.isAuthenticated()
        ? next()
        : res.status(401).send('로그인 하지 않은 사용자만 접근 가능 합니다.');
}