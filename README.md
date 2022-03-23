# mysql-study -- 
<br/>
## 1. express.js 설치 -> npm i express --save 
(--save를 붙여 package.json 의 "dependencies"에 해당 패키지를 설치)
<br/>
<br/>

## 2. Node.js의 패키지에 Entry Point 파일 만들기
(npm init 을 통해 package.json 을 생성 할때 설정한 entry point (기본값을 index.js) )
(package.json 파일의 "main": "엔트리포인트파일명.파일확장자")
(파일 위치는 package.json와 동일 선상에 생성한다.)
<br/>
<br/>

## 3. entry point(index.js)을 열어 express.js를 이용하여 웹 요청을 받아 처리하고 응답하게 코딩


``` Javascript
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello Node.js');
});

app.listen(port, () => {
    console.log('Listening...(서버 실행중...)');
})
```

app.listen([port[, host[, backlog]]][, callback])
app.listen() 메서드는 지정된 port, host로 접속할 수 있게 바인드(bind) 하고 대기(listen) 합니다. Node.js의 http.Server.listen() 메서드와 동일합니다.

app.get( path, callback )
app.get() 메서드는 지정된 경로에 대한 모든 유형의 HTTP 요청에 대해 실행됩니다. 테스트를 위해 경로를 전체("/")로 하였습니다.
<br/>
<br/>

## 4. 터미널에서 명령어 node index.js 를 실행 후 브라우저 localhost:8080 접속해 확인
<br/>
<br/>

## 5. npm 으로 실행하기 위해 Script 추가하기

``` JS
"scripts": {
    "start" : node index.js
}
```
<br/>
<br/>

## 6. npm run 명령어로 실행

```
npm run start
```
<br/>
<br/>

=====================

참고
https://carrotweb.tistory.com/107

=====================