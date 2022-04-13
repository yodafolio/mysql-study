const { Post, User } = require('../models');
const { verify } = require('../modules/jwt');


/**
 * @swagger
 *  /user:
 *    post:
 *      tags:
 *      - user
 *      summary: 유저 회원가입
 *      description: 유저 회원가입
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: Body
 *          required: true
 *          description :
 *          schema:
 *              $ref: "#/definitions/userSignUp"
 */
module.exports.createPost = async(req, res, next) => {
    try {
        const { title, content } = req.body;

        if(!content.length) return res.status(400).send('content가 비어 있습니다.');

        const decode = await verify(req.headers.authorization);

        if(decode === -2) return res.status(400).send('유효하지 않은 토큰 입니다.');
        if(decode === -3) return res.status(400).send('로그인 인증이 만료 되었습니다.');

        const dbUser = await User.findOne({
            where: {
                userEmail: decode.email
            },
            raw: true
        })
        
        if(dbUser.id === decode.id && dbUser.userEmail === decode.email) {
            const createPost = await Post.create({
                title,
                content,
                userId: dbUser.id
            });

            return res.status(200).send(createPost);
        }
        
        res.status(400).send('사용자가 일치하지 않습니다.');
    } catch (err) {
        console.error(err);
        next(err);
    }
}


/**
 * @swagger
 *  /post:
 *    get:
 *      tags:
 *      - post
 *      summary: 유저 상세정보 --
 *      description: 유저 상세정보
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          description : Bearer AccessToken
 *        - in: query
 *          name: userId
 *          required: true
 *          description : 유저 id
 */
module.exports.loadPostList = async(req, res, next) => {
    try {
        const decode = await verify(req.headers.authorization);

        if(decode === -2) return res.status(400).send('유효하지 않은 토큰 입니다.');
        if(decode === -3) return res.status(400).send('로그인 인증이 만료 되었습니다.');

        const dbUser = await User.findOne({
            where: {
                userEmail: decode.email
            }
        })

        if(dbUser.id !== decode.id) return res.status(400).send('사용자가 일치 하지 않습니다.');

        const posts = await Post.findAll({
            attributes: ['content', 'createdAt']
            // attributes: ['content', 'createdAt', 'updatedAt']
        });

        if(!posts) return res.status(400).send('content가 비어 있습니다.');


        res.status(200).send(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
};