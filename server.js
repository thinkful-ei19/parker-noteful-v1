'use strict';

// TEMP: Simple In-Memory Database
const express = require('express');
const { PORT } = require('./config');
const morgan = require('morgan');
const notesRouter = require('./router/notes.router');


console.log('hello world!');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/v1', notesRouter);


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
    });
});
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});