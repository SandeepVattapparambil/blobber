var express = require('express');
var router = express.Router();

app.get('/', function (req, res) {
  res.send("hello");
});

module.export = router;
