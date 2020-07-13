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
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.raw());
app.use(cookieParser());
app.use('/handlers', handlers)

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
        res.render('regular');
    });

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});
