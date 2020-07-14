const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const router = express.Router();

const PORT = 80;

const handlers = require('./handlers');

const app = express();

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    // console.log(req);
    res.end();
})
<<<<<<< HEAD
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.raw());
=======
app.use(bodyParser.json());
>>>>>>> parent of e9eef30... Added things
app.use(cookieParser());
// app.use('/handlers', handlers)

const jwtKey = 'E871C21F-F765-40F3-A0CE-ECF366B7B375|BD71A8D1-40F0-49CC-AA21-B6B956DF48B7';
const jwtExpirySeconds = 300;

const users = {
    user1: 'password1',
    user2: 'password2',
};
// No mount path, always returns
router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

router.use('/signin', (req, res, next) => {
        console.log('Request URL:', req / originalURL);
        next()
    },
    (req, res, next) => {
        console.log('Request Type:', req.method);
    });

// Sign-in handler
router.get('/signin', (req, res) => {
        // Get creds from JSON
        const {
            username,
            password
        } = req.body;
        console.log(req.body);
        if (!username || !password || users[username] !== password) {
            //401 if user/pass aren't present or if the password is wrong
            return res.status(401).end();
        } else next()
    },
    (req, res, next) => {
        // Create new token from usernam in payload; expires in 30s
        const token = jwt.sign({
            username
        }, jwtKey, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds,
        })
        console.log('token: ', token);

        // Set cookie as token string
        res.cookie('token', token, {
            maxAge: jwtExpirySeconds * 1000
        })
        res.send('regular');
    });

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});
