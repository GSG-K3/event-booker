const path = require('path');

const express = require('express');

const cookieParser = require('cookie-parser');

const router = require('./controllers');

const NotFoundError = require('./controllers/error/404Error');

const InternalError = require('./controllers/error/500Error');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

console.log('start App Riuter');

app.use(router);

console.log('404 Error');
app.use(NotFoundError);

app.use(InternalError);

module.exports = app;
