/*!
Zendesk JWT test server
Author: Greg Katechis
*/

// 'use strict'

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const PORT = 443;

const signIn = require('./Routes/signIn')
const refresh = require('./Routes/signIn')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/signin', signIn);
app.use('/refresh', refresh);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});