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
/*Import Embedded JavaScript Templating*/
var ejs = require('ejs');

/*Set HTML Views folder*/
app.use(express.static("public"));
/*Set Static assets folder containing *.css and *.js files*/
app.use(express.static("assets"));

/*Routing*/
app.get('/', function (req, res) {
  res.send('Hello World!');
})

/*express server*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
