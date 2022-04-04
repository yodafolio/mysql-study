const { Post, User } = require('../models');
const { verify } = require('../modules/jwt');


module.exports.createPost = async(req, res, next) => {
    try {
        const decode = await verify(req.headers.authorization);

        const { content } = req.body;

        if(!content.length) return res.status(400).send('content가 비어 있습니다.');

        const dbUser = await User.findOne({
            where: {
                userEmail: decode.email
            }
        })

        if(dbUser.id === decode.id && dbUser.userEmail === decode.email) {
            const createPost = await Post.create({ content });

            return res.status(200).send(createPost.dataValues);
        }
        
        res.status(400).send('사용자가 일치하지 않습니다.');
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports.loadPostList = async(req, res, next) => {
    try {
        const { content } = req.body;
        
        const posts = await Post.findAll({
            attributes: ['content', 'createdAt', 'updatedAt']
        });
        // const posts = await Post.findAll({
        //     attributes: {
        //         exclude: ['updatedAt'] // 테이블에서 updatedAt만 빼고 가져오겠다.
        //     }
        // });

        if(!posts) return res.status(400).send('content가 비어 있습니다.');

        res.status(200).send(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
};