// 'use strict'

const jwt = require('jsonwebtoken');
const jwtKey = 'E871C21F-F765-40F3-A0CE-ECF366B7B375|BD71A8D1-40F0-49CC-AA21-B6B956DF48B7';
const jwtExpirySeconds = 300;

const users = {
    user1: 'password1',
    user2: 'password2',
};

// Sign-in handler
const signIn = (req, res) => {
    // Get creds from JSON
    const {
        username,
        password
    } = req.body;
    if (!username || !password || users[username] !== password) {
        //401 if user/pass aren't present or if the password is wrong
        return res.status(401).end();
    };

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
    res.end();
};

// Welcome handler

const welcome = (req, res) => {
    // Get token from request's cookies
    const token = req.cookies.token

    // No cookie? 401 for you.
    if (!token) {
        return res.status(401).end();
    };

    var payload
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    };

    res.send(`Welcome ${payload.username}!`)

};

// Refresh handler since expiry is short

const refresh = (req, res) => {
    // Get token from request's cookies
    const token = req.cookies.token

    // No cookie? 401 for you.
    if (!token) {
        return res.status(401).end();
    };

    var payload
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    };

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400).end();
    };

    // Create new token from usernam in payload; expires in 30s
    const newToken = jwt.sign({
        username
    }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds,
    })
    console.log('token: ', newToken);

    // Set cookie as token string
    res.cookie('token', newToken, {
        maxAge: jwtExpirySeconds * 1000
    })
    res.end();

};

module.exports = {
    signIn,
    welcome,
    refresh,
}