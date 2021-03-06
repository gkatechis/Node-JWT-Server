// Refresh handler

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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