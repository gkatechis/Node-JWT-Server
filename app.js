const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const PORT = 8000;


const {signIn, welcome, refresh} = require('./handlers');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', signIn);
app.get('/welcome', welcome);
app.post('/refresh', refresh);
app.get('/', (req, res) => {
    res.redirect(301, '/sigin');
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server listening on port ${PORT}`);
});
console.log(`App listening on port ${PORT}`);