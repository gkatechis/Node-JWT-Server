// const jwt = require('jsonwebtoken');
// const express = require('express');
// const router = express.Router();
// const jwtKey = 'E871C21F-F765-40F3-A0CE-ECF366B7B375|BD71A8D1-40F0-49CC-AA21-B6B956DF48B7';
// const jwtExpirySeconds = 300;

// const users = {
//     user1: 'password1',
//     user2: 'password2',
// };
// // No mount path, always returns
// router.use((req, res, next) => {
//     console.log('Time:', Date.now());
//     next();
// });

// router.use('/signin', (req, res, next) => {
//     console.log('Request URL:', req/originalURL);
//     next()
// },
// (req, res, next) => {
//     console.log('Request Type:', req.method);
// });

// // // Welcome handler
// // router.get('/welcome = (req,res) => {
// //     // Get token from request's cookies
// //     const token = req.cookies.token

// //     // No cookie? 401 for you.
// //     if (!token) {
// //         return res.status(401).end();
// //     };

// // var payload
// // try {
// //     payload = jwt.verify(token, jwtKey);
// // } catch (e) {
// //     if (e instanceof jwt.JsonWebTokenError) {
// //         return res.status(401).end();
// //     }
// //     return res.status(400).end();
// // };

// // res.send(`Welcome ${payload.username}!`)

// // };

// // Refresh handler since expiry is short

// const refresh = (req, res) => {
//     // Get token from request's cookies
//     const token = req.cookies.token

//     // No cookie? 401 for you.
//     if (!token) {
//         return res.status(401).end();
//     };

//     var payload
//     try {
//         payload = jwt.verify(token, jwtKey);
//     } catch (e) {
//         if (e instanceof jwt.JsonWebTokenError) {
//             return res.status(401).end();
//         }
//         return res.status(400).end();
//     };

//     const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
//     if (payload.exp - nowUnixSeconds > 30) {
//         return res.status(400).end();
//     };

// // Create new token from usernam in payload; expires in 30s
// const newToken = jwt.sign({username}, jwtKey, {
//     algorithm: 'HS256',
//     expiresIn: jwtExpirySeconds,
// })
// console.log('token: ', newToken);

// // Set cookie as token string
// res.cookie('token', newToken, {
//     maxAge: jwtExpirySeconds * 1000
// })
// res.end();

// };

// module.exports = {
//     signIn,
//     // welcome,
//     refresh,
// }