'use strict'

// Sign-in Router

const jwt = require('jsonwebtoken');
const jwtKey = 'WcG763DFhQxogtDuHdIcSDwZo40bdLPe6iSyT7auMYu5J5Ki';
const jwtExpirySeconds = 300;
const express = require('express');
const router = express.Router();

const users = {
    user1: 'password1',
    user2: 'password2',
};

router.post('/', (req, res) => {
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
    res.send(`Username: ${username}  token: ${token}`);

});

router.get('/', (req, res) => {
    // Get token from request's cookies
    const token = req.cookies.token

    // No cookie? 401 for you.
    if (!token) {
        return res.status(401).end();
    };

    var payload
    try {
        payload = jwt.verify(token, jwtKey);
        console.log("JWT verify is", payload);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    };

    res.send(`Welcome ${payload.username}!`)

});
 

module.exports = router;