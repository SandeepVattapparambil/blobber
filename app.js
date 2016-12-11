/*
**
**Blobber Server
**Written by Sandeep Vattapparambil
**sandeepv68@gmail.com
**
*/
'use strict'
/*Import the express module*/
var express = require('express');
/*Instantiate express module*/
var app = express();

app.set('port', process.env.PORT || 3000);
/*Set Static assets folder containing *.css and *.js files*/
app.use(express.static("assets"));

app.use(require('./routes/login'));
/*express server*/
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
