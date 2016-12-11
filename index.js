/*
**
**Blobber Server
**Written by Sandeep Vattapparambil
**sandeepv68@gmail.com
**
*/
'use strict'
var express = require('express')/*Import the express module*/
var app = express()/*Instantiate express module*/
var ejs = require('ejs')/*Import Embedded JavaScript Templating*/

/*Routing*/
app.get('/', function (req, res) {
  res.send('Hello World!')
})

/*express server*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
