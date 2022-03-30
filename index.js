const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // restAPI를 사용할때, req.body의 내용을 서버가 온전히 받기위해 꼭 사용해야 한다.
const morgan = require('morgan');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const db = require('./models');


dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error());

const port = process.env.DB_PORT;

const corsOption = {
    origin : ['http://localhost:8010'],
    credentials: true,
}



app.use(cors(corsOption));
// app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies);
    res.send('Hello Node.js');

});


app.use('/user', userRouter);


app.listen(port, () => {
    console.log('Listening...(서버 실행중...)', port);
})