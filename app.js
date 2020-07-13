const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const PORT = 8000;


const {signIn, welcome, refresh} = require('./handlers');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.set('port', process.env.PORT || 8000);
app.post('/signin', signIn);
app.get('/welcome', welcome);
app.post('/refresh', refresh);

app.listen(8000);
console.log(`App listening on port ${PORT}`);