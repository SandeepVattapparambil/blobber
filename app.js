/**
 *Blobber Server
 *Written by Sandeep Vattapparambil
 *sandeepv68@gmail.com
 */
/*Express Module Import*/
var express = require('express');
/*Path Module for file I/O*/
var path = require('path');
/*Favicon Module*/
var favicon = require('serve-favicon');
/*Morgan Logger Module*/
var logger = require('morgan');
/*Eexpress-Session Module*/
var expressSession = require('express-session');
/*Cookie-Parser Module*/
var cookieParser = require('cookie-parser');
/*URL Parameter parsing Module*/
var bodyParser = require('body-parser');

/*App routes*/
var index = require('./routes/index');
/*API routes*/
var api = require('./routes/api');

/*Instantiate Express Module*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//EJS view engine is used
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'blobber_secret_key',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
