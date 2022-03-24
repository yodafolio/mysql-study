const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const app = express();
const port = 3015;

let corsOption = {
    origin : ['http://localhost:3015'],
    credentials: true,
}

app.use(cors(corsOption));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies);
    res.send('Hello Node.js');

});

app.listen(port, () => {
    console.log('Listening...(서버 실행중...)');
})