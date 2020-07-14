'use strict'

const jwt = require('jsonwebtoken');
const jwtKey = 'E871C21F-F765-40F3-A0CE-ECF366B7B375|BD71A8D1-40F0-49CC-AA21-B6B956DF48B7';
const jwtExpirySeconds = 300;
const express = require('express');
const router = express.router();

const users = {
    user1: 'password1',
    user2: 'password2',
};

router.get('/signin', (req, res) => {
    // Get creds from JSON
    const {username,password} = req.body;
    if (!username || !password || users[username] !== password) {
        return res.status(401).end();
    };

    // Create new token from username in payload; expires in 300s
    const token = jwt.sign({username}, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds,
    });
    console.log('token: ', token);

    // Set cookie as token string
    res.cookie('token', token, {
        maxAge: jwtExpirySeconds * 1000
    });
    res.end();
});

module.exports = router;