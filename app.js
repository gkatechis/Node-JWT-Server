const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const PORT = 80;


const signIn = require('./handlers');

const app = express();

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    console.log(req[0]);
    res.end();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw());
app.use(cookieParser());

app.post('/signin', signIn);
// app.get('/welcome', welcome);
// app.post('/refresh', refresh);
// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/', {
    signIn
    // welcome,
    // refresh
})

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});
